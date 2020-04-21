import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationRolesModalPage} from './organization-roles-modal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [OrganizationRolesModalPage],
    exports: [OrganizationRolesModalPage]
})

export class OrganizationRolesModalPageModule {
}
