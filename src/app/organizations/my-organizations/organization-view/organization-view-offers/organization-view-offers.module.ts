import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationViewOffersPageRoutingModule} from './organization-view-offers-routing.module';

import {OrganizationViewOffersPage} from './organization-view-offers.page';
import {CreateOrganizationRequestPageModule} from './create-organization-request/create-organization-request.module';
import {CreateOrganizationRequestPage} from './create-organization-request/create-organization-request.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrganizationViewOffersPageRoutingModule,
        CreateOrganizationRequestPageModule
    ],
    declarations: [OrganizationViewOffersPage],
    entryComponents: [CreateOrganizationRequestPage]
})
export class OrganizationViewOffersPageModule {
}
