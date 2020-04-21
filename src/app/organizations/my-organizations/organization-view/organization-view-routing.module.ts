import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrganizationViewPage} from './organization-view.page';

const routes: Routes = [
    {
        path: '',
        component: OrganizationViewPage,
        children: [
            {
                path: 'members',
                loadChildren: () => import('./organization-view-members/organization-view-members.module')
                    .then(m => m.OrganizationViewMembersPageModule)
            },
            {
                path: 'documents',
                loadChildren: () => import('./organization-view-documents/organization-view-documents.module')
                    .then(m => m.OrganizationViewDocumentsPageModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./organization-view-settings/organization-view-settings.module')
                    .then(m => m.OrganizationViewSettingsPageModule)
            },
            {
                path: 'offers',
                loadChildren: () => import('./organization-view-offers/organization-view-offers.module')
                    .then(m => m.OrganizationViewOffersPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationViewPageRoutingModule {
}
