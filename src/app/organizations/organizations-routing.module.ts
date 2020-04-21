import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrganizationsPage} from './organizations.page';

const routes: Routes = [
    {
        path: '',
        component: OrganizationsPage
    },
    {
        path: 'create',
        loadChildren: () => import('./create-organization/create-organization.module').then(m => m.CreateOrganizationPageModule)
    },
    {
        path: 'my-organizations',
        loadChildren: () => import('./my-organizations/my-organizations.module').then(m => m.MyOrganizationsPageModule)
    },
    {
        path: 'join-to-organization',
        loadChildren: () => import('./join-to-organization/join-to-organization.module').then(m => m.JoinToOrganizationPageModule)
    },
    {
        path: 'public-organizations',
        loadChildren: () => import('./public-organizations/public-organizations.module').then(m => m.PublicOrganizationsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationsPageRoutingModule {
}
