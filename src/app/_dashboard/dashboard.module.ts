import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '../_layout/layout.module';
import { SharedModule } from '../_modules/shared.module';
import { GridsterModule } from 'angular-gridster2';
import { GridComponent } from './components/grid/grid.component';

const DASH_COMPONENTS = [DashboardContainerComponent, GridComponent];

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
    GridsterModule
  ],
  declarations: DASH_COMPONENTS,
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
