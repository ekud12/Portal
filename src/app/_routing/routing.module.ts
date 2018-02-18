import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../_user/login/login.component';
import { PageNotFoundComponent } from '../_modules/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: '../_user/user.module#UserModule'
  },
  {
    path: 'dash',
    loadChildren: '../_dashboard/dashboard.module#DashboardModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: PreloadAllModules }
      // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
