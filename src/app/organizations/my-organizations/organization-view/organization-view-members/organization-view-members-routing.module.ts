import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationViewMembersPage } from './organization-view-members.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationViewMembersPage
  },
  {
    path: ':memberId',
    loadChildren: () => import('./member-view/member-view.module').then( m => m.MemberViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationViewMembersPageRoutingModule {}
