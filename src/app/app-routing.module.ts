import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotpagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), AuthRoutingModule, PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
