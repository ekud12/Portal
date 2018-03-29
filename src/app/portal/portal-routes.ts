import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { GridComponent } from './grid/grid.component';
import { ContainerComponent } from './container/container.component';
import { Grid2Component } from './grid2/grid2.component';

export const portalRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'falconx', pathMatch: 'full' },
      { path: 'home', component: PageNotFoundComponent },
      { path: 'grid', component: Grid2Component },
      {
        path: 'zakaut',
        loadChildren: 'app/features/zakaut/zakaut.module#ZakautModule'
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
