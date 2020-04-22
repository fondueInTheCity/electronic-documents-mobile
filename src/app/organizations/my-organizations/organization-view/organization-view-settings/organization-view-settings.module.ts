import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationViewSettingsPageRoutingModule} from './organization-view-settings-routing.module';

import {OrganizationViewSettingsPage} from './organization-view-settings.page';
import {OrganizationRolesModalPageModule} from './organization-roles-modal/organization-roles-modal.module';
import {OrganizationRolesModalPage} from './organization-roles-modal/organization-roles-modal.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        OrganizationViewSettingsPageRoutingModule,
        OrganizationRolesModalPageModule
    ],
    declarations: [OrganizationViewSettingsPage],
    entryComponents: [OrganizationRolesModalPage]
})
export class OrganizationViewSettingsPageModule {
}
