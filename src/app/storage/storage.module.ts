import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StoragePageRoutingModule} from './storage-routing.module';

import {StoragePage} from './storage.page';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StoragePageRoutingModule
    ],
    declarations: [StoragePage],
    providers: [
        File,
        FileOpener
    ]
})
export class StoragePageModule {
}
