import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationsPageRoutingModule } from './organizations-routing.module';

import { OrganizationsPage } from './organizations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationsPageRoutingModule
  ],
  declarations: [OrganizationsPage]
})
export class OrganizationsPageModule {}
