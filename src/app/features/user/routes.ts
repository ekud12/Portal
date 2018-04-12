import { Routes } from '@angular/router';

import { ChangePassComponent } from './change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';

export const userRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'replace',
    component: ChangePassComponent
  }
];
