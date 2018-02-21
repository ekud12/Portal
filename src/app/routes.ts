import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: '../features/user/user.module#UserModule' },
  {
    path: 'dash',
    loadChildren: '../features/dashboard/dashboard.module#DashboardModule'
  },
  { path: '**', component: PageNotFoundComponent }
];
