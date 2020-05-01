import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DocumentViewPage} from './document-view.page';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {ProgressBarModule} from 'angular-progress-bar';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        ProgressBarModule
    ],
    declarations: [DocumentViewPage],
    exports: [DocumentViewPage],
    providers: [
        File,
        FileOpener
    ]
})
export class DocumentViewPageModule {
}
