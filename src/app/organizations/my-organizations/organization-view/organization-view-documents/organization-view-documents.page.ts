import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DocumentInfo} from '../../../../models/documents/document-info';
import {OrganizationDocumentsInfo} from '../../../../models/documents/organization-documents-info';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {DocumentService} from '../../../../services/document.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {PropertiesService} from '../../../../services/properties.service';
import {DocumentListInfo} from '../../../../models/documents/document-list-info';
import {AlertController, ModalController} from '@ionic/angular';
import {DocumentViewPage} from '../../../../documents/document-view/document-view.page';

@Component({
    selector: 'app-organization-view-documents',
    templateUrl: './organization-view-documents.page.html',
    styleUrls: ['./organization-view-documents.page.scss'],
})
export class OrganizationViewDocumentsPage implements OnInit, OnDestroy {
    userId: number;
    documents: DocumentInfo[];
    uploadSubscription: Subscription;
    getFilesSubscription: Subscription;
    changeSubscription: Subscription;
    approveDenySubscription: Subscription;
    organizationId: number;
    client: any;

    selectedFiles: FileList;
    currentFile: File;
    progress = 0;
    message = '';

    filesInfo: OrganizationDocumentsInfo;

    slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    documentsInfo: DocumentListInfo[] = [
        {
            header: 'Heap',
            documentsName: 'heapDocuments'
        },
        {
            header: 'Waiting',
            documentsName: 'waitingDocuments'
        },
        {
            header: 'In Progress',
            documentsName: 'progressDocuments'
        },
        {
            header: 'Answered',
            documentsName: 'answeredDocuments'
        }
    ];


    constructor(private organizationService: OrganizationService,
                private activatedRoute: ActivatedRoute,
                private documentsService: DocumentService,
                private tokenStorageService: TokenStorageService,
                private properties: PropertiesService,
                private alertController: AlertController,
                private modalController: ModalController) {
    }

    async ngOnInit() {
        this.userId = this.tokenStorageService.getId();
        this.organizationId = this.properties.getCurrentOrganizationId();
        this.getFiles();
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    async upload() {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        this.properties.unsubscribe(this.uploadSubscription);
        this.documentsService.upload(this.currentFile, this.organizationId, this.userId).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress = Math.round(event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.progress = 0;
                    this.getFiles();
                }
            },
            err => {
                this.progress = 0;
                this.message = 'Could not upload the file!';
                this.currentFile = undefined;
            });

        this.selectedFiles = undefined;
    }

    private async getFiles(event = null) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getFilesSubscription);
        this.getFilesSubscription = this.documentsService.getMyOrganizationDocumentsInfo(this.organizationId, this.userId)
            .subscribe(async (data) => {
                    await this.properties.endLoading();
                    this.filesInfo = data;
                    if (event) {
                        event.target.complete();
                    }
                }, () => {
                    if (event) {
                        event.target.complete();
                    }
                }
            );
    }

    async clickFun(item: DocumentInfo) {
        switch (item.documentState) {
            case 'HEAP':
                await this.presentAlertPrompt(item);
                break;
            case 'WAITING':
                this.changeDocumentState(item, 'PENDING');
                break;
            case 'PENDING':
                this.approveDenyDocumentAlert(item);
                break;
            case 'ANSWERED':
                break;
        }
    }

    async presentAlertPrompt(item: DocumentInfo) {
        const alert = await this.alertController.create({
            header: 'Approve Heap File!',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'File Name',
                    value: item.name
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        this.properties.unsubscribe(this.changeSubscription);
                        this.changeSubscription = this.organizationService.changeDocumentState(item.id, 'WAITING')
                            .subscribe(() => this.getFiles());
                    }
                }
            ]
        });

        await alert.present();
    }

    async approveDenyDocumentAlert(item: DocumentInfo) {
        const alert = await this.alertController.create({
            header: 'Error',
            message: `Approve document?`,
            buttons: [
                {
                    text: 'Approve',
                    handler: () => this.approveDenyDocument(true, item.id)
                },
                {
                    text: 'Deny',
                    handler: () => this.approveDenyDocument(false, item.id)
                }]
        });
        await alert.present();
    }

    async approveDenyDocument(answer: boolean, documentId: number) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.approveDenySubscription);
        this.approveDenySubscription = this.organizationService.approveDenyDocument(documentId, answer)
            .subscribe(async () => {
                    await this.properties.endLoading();
                    this.getFiles();
                }, async error => {
                    await this.properties.endLoading();
                }
            );
    }

    changeDocumentState(item: DocumentInfo, to: string) {
        this.organizationService.changeDocumentState(item.id, to).subscribe(() => this.getFiles());
    }

    async ftpAlert(messages: string) {
        const alert = await this.alertController.create({
            header: 'Error',
            message: messages,
        });
        await alert.present();
    }

    async doRefresh(event) {
        this.getFiles(event);
    }

    async presentDocumentModal(documentId: number) {
        const modal = await this.modalController.create({
            component: DocumentViewPage,
            componentProps: {
                documentId
            }
        });
        return await modal.present();
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.changeSubscription);
        this.properties.unsubscribe(this.getFilesSubscription);
        this.properties.unsubscribe(this.uploadSubscription);
        this.properties.unsubscribe(this.approveDenySubscription);
    }
}
