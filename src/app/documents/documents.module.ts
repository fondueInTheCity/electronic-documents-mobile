import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DocumentsPageRoutingModule} from './documents-routing.module';

import {DocumentsPage} from './documents.page';
import {DocumentViewPageModule} from './document-view/document-view.module';
import {DocumentViewPage} from './document-view/document-view.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DocumentsPageRoutingModule,
        DocumentViewPageModule
    ],
    declarations: [DocumentsPage],
    entryComponents: [DocumentViewPage]
})
export class DocumentsPageModule {
}
