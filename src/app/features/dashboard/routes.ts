import { GridComponent } from './components/grid/grid.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const dashRoutes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
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
