import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { ZakautActionsComponent } from './components/zakaut-actions/zakaut-actions.component';

export const zakautRoutes: Routes = [
  {
    path: '',
    component: ZakautActionsComponent,
    children: [
      { path: '', component: PageNotFoundComponent },
      { path: '**', redirectTo: '/dash/home' }
    ]
  }
];
