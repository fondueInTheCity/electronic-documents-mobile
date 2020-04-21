import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinToOrganizationPage } from './join-to-organization.page';

const routes: Routes = [
  {
    path: '',
    component: JoinToOrganizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinToOrganizationPageRoutingModule {}
