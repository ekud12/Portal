import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '../_layout/layout.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, LayoutModule],
  declarations: [DashboardContainerComponent],
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
