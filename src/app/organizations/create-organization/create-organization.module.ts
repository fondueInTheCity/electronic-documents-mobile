import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOrganizationPageRoutingModule } from './create-organization-routing.module';

import { CreateOrganizationPage } from './create-organization.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateOrganizationPageRoutingModule
  ],
  declarations: [CreateOrganizationPage]
})
export class CreateOrganizationPageModule {}
