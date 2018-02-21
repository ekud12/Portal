import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';

const dashRoutes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      { path: 'home', component: PageNotFoundComponent },
      { path: 'settings', component: GridComponent },
      { path: '**', redirectTo: '/dash/home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
