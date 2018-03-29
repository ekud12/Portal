import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvoicesModule } from '../features/invoices/invoices.module';
import { UserModule } from '../features/user/user.module';
import { RouterModule } from '@angular/router';
import { portalRoutes } from './portal-routes';
import { GridComponent } from './grid/grid.component';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ZakautWidgetComponent } from './widgets/zakaut-widget/zakaut-widget.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { FalconxInvChartComponent } from './widgets/falconx-inv-chart/falconx-inv-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ILastInvoiceTotalWidgetComponent } from './widgets/i-last-invoice-total-widget/i-last-invoice-total-widget.component';
import { Chart1Component } from './tests/chart1/chart1.component';
import { Chart2Component } from './tests/chart2/chart2.component';
import { Grid2Component } from './grid2/grid2.component';
import { GridsterModule } from 'angular-gridster2';

const DASH_COMPONENTS = [ContainerComponent, GridComponent, HeaderComponent, FooterComponent];

const GRID_WIDGETS = [ZakautWidgetComponent, FalconxInvChartComponent, ILastInvoiceTotalWidgetComponent];
@NgModule({
  imports: [CommonModule, SharedModule, UserModule, GridsterModule, NgxChartsModule, RouterModule.forChild(portalRoutes)],
  providers: [{ provide: 'GridsterItem', useClass: FooterComponent }],
  entryComponents: GRID_WIDGETS,
  declarations: [
    ...DASH_COMPONENTS,
    ...GRID_WIDGETS,
    FalconxInvChartComponent,
    ILastInvoiceTotalWidgetComponent,
    Chart1Component,
    Chart2Component,
    GridComponent
  ],
  exports: [ContainerComponent]
})
export class PortalModule {}
