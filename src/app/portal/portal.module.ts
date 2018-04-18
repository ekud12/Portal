import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { GridStackModule } from 'ng4-gridstack';

import { UserModule } from '../features/user/user.module';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { GridComponent } from './grid/grid.component';
import { GridService } from './grid/grid.service';
import { HeaderComponent } from './header/header.component';
import { portalRoutes } from './portal-routes';
import { effects, widgetReducer } from './store';
import { HorizontalChartWidgetComponent } from './tests/horizontal-chart-widget/horizontal-chart-widget.component';
import { LineChartWidgetComponent } from './tests/line-chart-widget/line-chart-widget.component';
import { NumberStatWidgetComponent } from './tests/number-stat-widget/number-stat-widget.component';
import { PieChartAdvancedWidgetComponent } from './tests/pie-chart-advanced-widget/pie-chart-advanced-widget.component';
import { PieChartWidgetComponent } from './tests/pie-chart-widget/pie-chart-widget.component';
import { VerticalChartWidgetComponent } from './tests/vertical-chart-widget/vertical-chart-widget.component';


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
