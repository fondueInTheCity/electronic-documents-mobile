import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationViewPageRoutingModule } from './organization-view-routing.module';

import { OrganizationViewPage } from './organization-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationViewPageRoutingModule
  ],
  declarations: [OrganizationViewPage]
})
export class OrganizationViewPageModule {}
