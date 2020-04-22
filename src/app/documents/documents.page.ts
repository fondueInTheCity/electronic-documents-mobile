import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentService} from '../services/document.service';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {DocumentInfo} from '../models/documents/document-info';
import {PropertiesService} from '../services/properties.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.page.html',
    styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit, OnDestroy {
    getSubscription: Subscription;
    documentsInfo: DocumentInfo[];

    constructor(private documentsService: DocumentService,
                private tokenStorageService: TokenStorageService,
                private properties: PropertiesService) {
    }

    async ngOnInit() {
        this.getDocuments();
    }

    async getDocuments() {
        await this.properties.startLoading();
        this.properties.unsubscribe(this.getSubscription);
        this.getSubscription = this.documentsService.getUserDocumentsInfo(this.tokenStorageService.getId())
            .subscribe(async (data) => {
                    await this.properties.endLoading();
                    this.documentsInfo = data.documentsInfo;
                },
                async error => {
                    await this.properties.endLoading();
                    this.properties.getErrorAlertOpts(error);
                });
    }

    ngOnDestroy(): void {
        this.properties.unsubscribe(this.getSubscription);
    }
}
