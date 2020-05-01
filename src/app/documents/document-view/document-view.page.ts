import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PropertiesService} from '../../services/properties.service';
import {FormBuilder} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {DocumentService} from '../../services/document.service';
import {HeapDocumentView} from '../../models/documents/heap-document-view';
import {OrganizationRoleInfo} from '../../models/organization/organization-role-info';
import {WaitingDocumentView} from '../../models/documents/waiting-document-view';
import {JoinToMeDocumentView} from '../../models/documents/join-to-me-document-view';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {Subscription} from 'rxjs';
import {AnsweredDocumentView} from '../../models/documents/answered-document-view';
import {PendingDocumentView} from '../../models/documents/pending-document-view';

@Component({
    selector: 'app-document-view',
    templateUrl: './document-view.page.html',
    styleUrls: ['./document-view.page.scss'],
})
export class DocumentViewPage implements OnInit, OnDestroy {
    @Input() documentId: number;
    @Input() state: string;
    getSubscription: Subscription;
    heapDocument: HeapDocumentView;
    waitingDocument: WaitingDocumentView;
    pendingDocumentView: PendingDocumentView;
    joinToMeDocument: JoinToMeDocumentView;
    answeredDocument: AnsweredDocumentView;
    allRoles: OrganizationRoleInfo[];
    heapForm = this.fb.group({
        id: [],
        organizationId: [],
        name: [],
        roles: []
    });
    waitingForm = this.fb.group({
        id: [],
        organizationId: [],
        organizationName: [],
        name: [],
        count: []
    });
    joinToMeForm = this.fb.group({
        id: [],
        answer: []
    });
    downloaded = false;
    fileExists = false;
    progress = 0;
    downloadInProgress = false;
    countAnswered: number;
    show: boolean;


    constructor(private modalController: ModalController,
                private properties: PropertiesService,
                private fb: FormBuilder,
                private organizationService: OrganizationService,
                private documentService: DocumentService,
                private file: File,
                private fileOpener: FileOpener) {
    }

    async ngOnInit() {
        this.getData();
    }

    async getData() {
        this.show = false;
        this.properties.unsubscribe(this.getSubscription);
        await this.properties.startLoading();
        if (this.state === 'HEAP') {
            this.getSubscription = this.documentService.getHeapDocument(this.documentId).subscribe((data) => {
                this.heapForm.patchValue(data);
                this.allRoles = data.allRoles;
                this.heapDocument = data;
                this.show = true;
                this.properties.endLoading();
            }, error => {
                this.properties.endLoading();
                this.show = true;
                this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
            });
        } else if (this.state === 'WAITING') {
            this.getSubscription = this.documentService.getWaitingDocument(this.documentId).subscribe((data) => {
                this.waitingForm.patchValue(data);
                this.waitingDocument = data;
                this.properties.endLoading();
                this.show = true;
            }, error => {
                this.properties.endLoading();
                this.show = true;
                this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
            });
        } else if (this.state === 'PENDING') {
            this.getSubscription = this.documentService.getPendingDocument(this.documentId).subscribe((data) => {
                this.pendingDocumentView = data;
                this.countAnswered = data.answers.filter(answer => answer.answer).length;
                this.properties.endLoading();
                this.show = true;
            }, error => {
                this.properties.endLoading();
                this.show = true;
                this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
            });
        } else if (this.state === 'JOIN_TO_ME') {
            this.getSubscription = this.documentService.getJoinToMeDocument(this.documentId).subscribe((data) => {
                this.properties.endLoading();
                this.joinToMeForm.patchValue(data);
                this.joinToMeDocument = data;
                this.show = true;
                this.file.checkFile(this.file.dataDirectory, this.joinToMeDocument.name)
                    .then((res) => {
                        this.downloaded = res;
                    });
            }, error => {
                this.properties.endLoading();
                this.show = true;
                this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
            });
        }  else if (this.state === 'ANSWERED') {
            this.getSubscription = this.documentService.getAnsweredDocument(this.documentId).subscribe((data) => {
                this.answeredDocument = data;
                this.countAnswered = data.joins.length;
                this.properties.endLoading();
                this.show = true;
            }, error => {
                this.properties.endLoading();
                this.show = true;
                this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
            });
        } else {
            await this.properties.endLoading();
            this.show = true;
        }
    }

    back() {
        this.modalController.dismiss();
    }

    async onSubmitHeap() {
        this.properties.unsubscribe(this.getSubscription);
        await this.properties.startLoading();
        this.getSubscription = this.documentService.approveUserHeapDocument(this.heapForm.value).subscribe(_ => {
            this.state = 'WAITING';
            this.properties.endLoading();
            this.getData();
        }, error => {
            this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
            this.properties.endLoading();
        });
    }

    async downloadFile() {
        this.downloadInProgress = true;
        await this.properties.startLoading();
        this.documentService.downloadDocumentForCheck(this.documentId).subscribe((blob) => {
                this.createFile(blob);
                this.downloaded = true;
                this.downloadInProgress = false;
                this.properties.endLoading();
            }, error => {
                this.properties.startAlert(this.properties.getErrorAlertOpts(error.message));
                this.properties.endLoading();
            }
        );
    }

    onSubmitJoinToMe(answer: boolean) {
        this.documentService.sendAnswer(this.documentId, {answer}).subscribe();
    }

    createFile(blob: Blob) {
        this.file.writeFile(`${this.file.dataDirectory}`, `${this.joinToMeDocument.name}`, blob)
            .then(res => {
                this.fileExists = true;
            }).catch(async error => await this.properties.startAlert(this.properties.getErrorAlertOpts(error.message)));
    }

    async openFile() {
        const filePath = `${this.file.dataDirectory}${this.joinToMeDocument.name}`;
        await this.fileOpener.open(filePath, 'text/plain').catch(async error =>
            await this.properties.startAlert(this.properties.getErrorAlertOpts(error.message)));
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }
}
