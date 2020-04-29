import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationViewMembersPage } from './organization-view-members.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationViewMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationViewMembersPageRoutingModule {}
