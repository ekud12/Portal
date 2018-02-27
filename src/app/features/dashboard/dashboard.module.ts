import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { GridComponent } from './components/grid/grid.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { RouterModule } from '@angular/router';
import { dashRoutes } from './routes';
import { UserModule } from '../user/user.module';

const DASH_COMPONENTS = [DashboardContainerComponent, GridComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvoicesModule,
    UserModule,
    GridsterModule,
    RouterModule.forChild(dashRoutes)
  ],
  declarations: DASH_COMPONENTS,
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
