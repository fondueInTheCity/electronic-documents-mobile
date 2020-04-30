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
    uploadInProgress = false;

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
        this.uploadInProgress = true;
        this.currentFile = this.selectedFiles.item(0);
        this.properties.unsubscribe(this.uploadSubscription);
        this.documentsService.upload(this.currentFile, this.organizationId, this.userId).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress = Math.round(event.loaded * 100 / event.total);
                } else if (event instanceof HttpResponse) {
                    this.progress = 0;
                    this.uploadInProgress = false;
                    this.getFiles();
                }
            },
            err => {
                this.progress = 0;
                this.uploadInProgress = false;
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

    async doRefresh(event) {
        this.getFiles(event);
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
        this.properties.unsubscribe(this.changeSubscription);
        this.properties.unsubscribe(this.getFilesSubscription);
        this.properties.unsubscribe(this.uploadSubscription);
        this.properties.unsubscribe(this.approveDenySubscription);
    }
}
