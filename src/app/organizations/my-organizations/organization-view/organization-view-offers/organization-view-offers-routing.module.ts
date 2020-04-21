import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationViewOffersPage } from './organization-view-offers.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationViewOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationViewOffersPageRoutingModule {}
