import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '../_layout/layout.module';
import { SharedModule } from '../_modules/shared.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, SharedModule, LayoutModule],
  declarations: [DashboardContainerComponent],
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
