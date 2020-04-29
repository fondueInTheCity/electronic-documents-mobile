import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MemberViewPage} from './member-view.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [MemberViewPage],
    exports: [MemberViewPage]
})
export class MemberViewPageModule {
}
