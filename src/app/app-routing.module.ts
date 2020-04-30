import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'organizations',
        loadChildren: () => import('./organizations/organizations.module').then(m => m.OrganizationsPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix'
    },
    {
        path: 'home',
        loadChildren: () => import('./storage/storage.module').then(m => m.StoragePageModule)
    },
    {
        path: 'home/:folder',
        loadChildren: () => import('./storage/storage.module').then(m => m.StoragePageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
    providers: [
        SQLite,
        SQLitePorter
    ]
})
export class AppRoutingModule {
}
