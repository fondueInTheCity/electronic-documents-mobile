import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicOrganizationsPageRoutingModule } from './public-organizations-routing.module';

import { PublicOrganizationsPage } from './public-organizations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicOrganizationsPageRoutingModule
  ],
  declarations: [PublicOrganizationsPage]
})
export class PublicOrganizationsPageModule {}
