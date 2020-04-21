import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrganizationsPageRoutingModule } from './my-organizations-routing.module';

import { MyOrganizationsPage } from './my-organizations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrganizationsPageRoutingModule
  ],
  declarations: [MyOrganizationsPage]
})
export class MyOrganizationsPageModule {}
