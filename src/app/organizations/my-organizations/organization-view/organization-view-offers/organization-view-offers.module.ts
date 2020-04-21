import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationViewOffersPageRoutingModule } from './organization-view-offers-routing.module';

import { OrganizationViewOffersPage } from './organization-view-offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationViewOffersPageRoutingModule
  ],
  declarations: [OrganizationViewOffersPage]
})
export class OrganizationViewOffersPageModule {}
