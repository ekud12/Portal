import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvoicesModule } from '../features/invoices/invoices.module';
import { UserModule } from '../features/user/user.module';
import { RouterModule } from '@angular/router';
import { portalRoutes } from './portal-routes';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

/** Components */
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NumberStatWidgetComponent } from './tests/number-stat-widget/number-stat-widget.component';
import { VerticalChartWidgetComponent } from './tests/vertical-chart-widget/vertical-chart-widget.component';
import { GridComponent } from './grid/grid.component';
import { PieChartWidgetComponent } from './tests/pie-chart-widget/pie-chart-widget.component';
import { HorizontalChartWidgetComponent } from './tests/horizontal-chart-widget/horizontal-chart-widget.component';

/** Widget Modules */
import { GridsterModule } from 'angular-gridster2';
import { Ng2OdometerModule } from 'ng2-odometer'; // <-- import the module
import { DynamicModule } from 'ng-dynamic-component';
import { GridStackModule } from 'ng4-gridstack';
import { PieChartAdvancedWidgetComponent } from './tests/pie-chart-advanced-widget/pie-chart-advanced-widget.component';
import { LineChartWidgetComponent } from './tests/line-chart-widget/line-chart-widget.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store';
import { widgetReducer } from './store';
import { GridService } from './grid/grid.service';

const DASH_COMPONENTS = [
  ContainerComponent,
  GridComponent,
  HeaderComponent,
  FooterComponent,
  NumberStatWidgetComponent,
  VerticalChartWidgetComponent,
  PieChartWidgetComponent,
  HorizontalChartWidgetComponent,
  PieChartAdvancedWidgetComponent,
  LineChartWidgetComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    GridsterModule,
    NgxChartsModule,
    Ng2OdometerModule.forRoot(),
    DynamicModule.withComponents([
      NumberStatWidgetComponent,
      VerticalChartWidgetComponent,
      PieChartWidgetComponent,
      HorizontalChartWidgetComponent,
      PieChartAdvancedWidgetComponent,
      LineChartWidgetComponent
    ]),
    GridStackModule,
    RouterModule.forChild(portalRoutes),
    StoreModule.forFeature('dashboard', widgetReducer),
    EffectsModule.forFeature(effects)
  ],
  providers: [{ provide: 'GridsterItem', useClass: FooterComponent }, GridService],
  declarations: DASH_COMPONENTS,
  exports: [ContainerComponent]
})
export class PortalModule {}
