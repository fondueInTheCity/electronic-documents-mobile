import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationViewDocumentsPageRoutingModule} from './organization-view-documents-routing.module';

import {OrganizationViewDocumentsPage} from './organization-view-documents.page';
import {FTP} from '@ionic-native/ftp/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrganizationViewDocumentsPageRoutingModule
    ],
    providers: [FTP],
    declarations: [OrganizationViewDocumentsPage]
})
export class OrganizationViewDocumentsPageModule {
}
