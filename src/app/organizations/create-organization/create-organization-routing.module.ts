import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrganizationPage } from './create-organization.page';

const routes: Routes = [
  {
    path: '',
    component: CreateOrganizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrganizationPageRoutingModule {}
