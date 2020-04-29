import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentService} from '../services/document.service';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {PropertiesService} from '../services/properties.service';
import {DocumentListInfo} from '../models/documents/document-list-info';
import {UserDocumentsInfo} from '../models/documents/user-documents-info';
import {AlertController, ModalController} from '@ionic/angular';
import {DocumentViewPage} from './document-view/document-view.page';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.page.html',
    styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    documents: UserDocumentsInfo;

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
            header: 'Join To Me',
            documentsName: 'joinToMe'
        },
        {
            header: 'Answered',
            documentsName: 'answeredDocuments'
        }
    ];

    constructor(private documentsService: DocumentService,
                private tokenStorageService: TokenStorageService,
                private properties: PropertiesService,
                private modalController: ModalController) {
    }

    async ngOnInit() {
        this.getDocuments();
    }

    async getDocuments(event = null) {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.documentsService.getUserDocumentsInfo(this.tokenStorageService.getId())
            .subscribe(async (data) => {
                    this.documents = data;
                    await this.properties.endLoading();
                    if (event) {
                        event.target.complete();
                    }
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                    if (event) {
                        event.target.complete();
                    }
                });
    }
    async doRefresh(event) {
        this.getDocuments(event);
    }

    async presentDocumentModal(documentId: number, state: string) {
        const modal = await this.modalController.create({
            component: DocumentViewPage,
            componentProps: {
                documentId,
                state
            }
        });
        return await modal.present();
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }
}
