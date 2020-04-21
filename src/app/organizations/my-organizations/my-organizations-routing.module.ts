import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrganizationsPage } from './my-organizations.page';

const routes: Routes = [
  {
    path: '',
    component: MyOrganizationsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./organization-view/organization-view.module').then( m => m.OrganizationViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrganizationsPageRoutingModule {}
