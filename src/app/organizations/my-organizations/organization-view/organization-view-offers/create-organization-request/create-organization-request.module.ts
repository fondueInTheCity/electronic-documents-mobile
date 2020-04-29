import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreateOrganizationRequestPage} from './create-organization-request.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [CreateOrganizationRequestPage],
    exports: [CreateOrganizationRequestPage]
})
export class CreateOrganizationRequestPageModule {
}
