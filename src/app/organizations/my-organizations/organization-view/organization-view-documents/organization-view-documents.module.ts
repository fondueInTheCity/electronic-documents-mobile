import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationViewDocumentsPageRoutingModule} from './organization-view-documents-routing.module';

import {OrganizationViewDocumentsPage} from './organization-view-documents.page';
import {DocumentViewPageModule} from '../../../../documents/document-view/document-view.module';
import {DocumentViewPage} from '../../../../documents/document-view/document-view.page';
import {ProgressBarModule} from 'angular-progress-bar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrganizationViewDocumentsPageRoutingModule,
        DocumentViewPageModule,
        ProgressBarModule
    ],
    providers: [],
    declarations: [OrganizationViewDocumentsPage],
    entryComponents: [DocumentViewPage]
})
export class OrganizationViewDocumentsPageModule {
}
