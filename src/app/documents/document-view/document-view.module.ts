import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DocumentViewPage} from './document-view.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [DocumentViewPage],
    exports: [DocumentViewPage]
})
export class DocumentViewPageModule {
}
