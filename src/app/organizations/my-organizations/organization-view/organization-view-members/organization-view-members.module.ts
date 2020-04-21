import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrganizationViewMembersPageRoutingModule} from './organization-view-members-routing.module';

import {OrganizationViewMembersPage} from './organization-view-members.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OrganizationViewMembersPageRoutingModule
  ],
  declarations: [OrganizationViewMembersPage]
})
export class OrganizationViewMembersPageModule {}
