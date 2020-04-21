import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsPage } from './documents.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./document-view/document-view.module').then( m => m.DocumentViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsPageRoutingModule {}
