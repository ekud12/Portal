import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule],
  declarations: [DashboardContainerComponent],
  exports: [DashboardContainerComponent]
})
export class DashboardModule {}
