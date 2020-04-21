import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationViewDocumentsPage } from './organization-view-documents.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationViewDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationViewDocumentsPageRoutingModule {}
