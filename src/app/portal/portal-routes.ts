import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { GridComponent } from './grid/grid.component';
import { ContainerComponent } from './container/container.component';

export const portalRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'zakaut', pathMatch: 'full' },
      { path: 'home', component: PageNotFoundComponent },
      { path: 'grid', component: GridComponent },
      {
        path: 'zakaut',
        loadChildren: '../zakaut/zakaut.module#ZakautModule'
      },
      { path: '**', redirectTo: '/dash/home' }
    ]
  },
  { path: '**', redirectTo: '/dash/home' }
];
