import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicOrganizationsPage } from './public-organizations.page';

const routes: Routes = [
  {
    path: '',
    component: PublicOrganizationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicOrganizationsPageRoutingModule {}
