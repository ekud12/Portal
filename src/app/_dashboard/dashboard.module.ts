import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '../_layout/layout.module';
import { SharedModule } from '../_modules/shared.module';
import { DashItemContainerComponent } from './components/dash-item-container/dash-item-container.component';

const DASH_COMPONENTS = [
  DashboardContainerComponent,
  DashItemContainerComponent
];

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, SharedModule, LayoutModule],
  declarations: DASH_COMPONENTS,
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
