import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { GridComponent } from './components/grid/grid.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { SharedModule } from '../../shared/shared.module';

const DASH_COMPONENTS = [DashboardContainerComponent, GridComponent];

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    GridsterModule
  ],
  declarations: DASH_COMPONENTS,
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
