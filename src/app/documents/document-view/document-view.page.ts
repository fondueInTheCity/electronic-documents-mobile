import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PropertiesService} from '../../services/properties.service';
import {FormBuilder} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {DocumentService} from '../../services/document.service';
import {HeapDocumentView} from '../../models/documents/heap-document-view';
import {OrganizationRoleInfo} from '../../models/organization/organization-role-info';
import {WaitingDocumentView} from '../../models/documents/waiting-document-view';
import {JoinToMeDocumentView} from '../../models/documents/join-to-me-document-view';

@Component({
    selector: 'app-document-view',
    templateUrl: './document-view.page.html',
    styleUrls: ['./document-view.page.scss'],
})
export class DocumentViewPage implements OnInit {
    @Input() documentId: number;
    @Input() state: string;
    heapDocument: HeapDocumentView;
    waitingDocument: WaitingDocumentView;
    joinToMeDocument: JoinToMeDocumentView;
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


    constructor(private modalController: ModalController,
                private properties: PropertiesService,
                private fb: FormBuilder,
                private organizationService: OrganizationService,
                private documentService: DocumentService) {
    }

    async ngOnInit() {
        this.getData();
    }

    async getData() {
        if (this.state === 'HEAP') {
            this.documentService.getHeapDocument(this.documentId).subscribe((data) => {
                this.heapForm.patchValue(data);
                this.allRoles = data.allRoles;
                this.heapDocument = data;
            });
        } else if (this.state === 'WAITING') {
            this.documentService.getWaitingDocument(this.documentId).subscribe((data) => {
                this.waitingForm.patchValue(data);
                this.waitingDocument = data;
            });
        } else if (this.state === 'JOIN_TO_ME') {
            this.documentService.getJoinToMeDocument(this.documentId).subscribe((data) => {
                this.joinToMeForm.patchValue(data);
                this.joinToMeDocument = data;
            });
        }
    }

    back() {
        this.modalController.dismiss();
    }

    onSubmitHeap() {
        this.documentService.approveUserHeapDocument(this.heapForm.value).subscribe();
    }

    downloadFile() {
        this.documentService.downloadDocumentForCheck(this.documentId).subscribe(() => {
            this.downloaded = true;
        });
    }

    onSubmitJoinToMe(answer: boolean) {
        this.documentService.sendAnswer(this.documentId, {answer}).subscribe();
    }
}
