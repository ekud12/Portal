import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: 'app/features/user/user.module#UserModule'
  },
  {
    path: 'portal',
    loadChildren: 'app/portal/portal.module#PortalModule'
  },
  { path: '**', component: PageNotFoundComponent }
];
