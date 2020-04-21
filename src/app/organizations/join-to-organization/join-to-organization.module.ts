import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinToOrganizationPageRoutingModule } from './join-to-organization-routing.module';

import { JoinToOrganizationPage } from './join-to-organization.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    JoinToOrganizationPageRoutingModule
  ],
  declarations: [JoinToOrganizationPage]
})
export class JoinToOrganizationPageModule {}
