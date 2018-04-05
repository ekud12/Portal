import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { ContainerComponent } from './container/container.component';
import { GridComponent } from './grid/grid.component';

export const portalRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'invoices', pathMatch: 'full' },
      { path: 'home', component: PageNotFoundComponent },
      { path: 'grid', component: GridComponent },
      {
        path: 'zakaut',
        loadChildren: 'app/features/zakaut/zakaut.module#ZakautModule'
      },
      {
        path: 'invoices',
        loadChildren: 'app/features/invoices/invoices.module#InvoicesModule'
      },
      {
        path: 'falconx',
        loadChildren: 'app/features/falconx/falconx.module#FalconxModule'
      },
      { path: '**', redirectTo: '/portal/home' }
    ]
  },
  { path: '**', redirectTo: '/portal/home' }
];
