import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { PrintLayoutComponent } from './shared/print-layout/print-layout.component';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'portal',
    loadChildren: 'app/portal/portal.module#PortalModule'
  },
  {
    path: 'print',
    component: PrintLayoutComponent
  },
  { path: '**', component: PageNotFoundComponent }
];
