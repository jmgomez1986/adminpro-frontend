import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-pages.module').then(m => m.ChildPagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
