import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationViewSettingsPage } from './organization-view-settings.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationViewSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationViewSettingsPageRoutingModule {}
