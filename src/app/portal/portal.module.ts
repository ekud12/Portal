import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvoicesModule } from '../features/invoices/invoices.module';
import { UserModule } from '../features/user/user.module';
import { RouterModule } from '@angular/router';
import { portalRoutes } from './portal-routes';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

import { GridComponent } from './grid/grid.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/**Widgets */
import { ZakautWidgetComponent } from './widgets/zakaut-widget/zakaut-widget.component';
import { Chart1Component } from './tests/chart1/chart1.component';
import { Chart2Component } from './tests/chart2/chart2.component';
import { GridsterModule } from 'angular-gridster2';
import { Grid2Component } from './grid2/grid2.component';
import { TestWidgetComponent } from './tests/test-widget/test-widget.component';
import { Ng2OdometerModule } from 'ng2-odometer'; // <-- import the module
import { DynamicModule } from 'ng-dynamic-component';
import { GridStackModule } from 'ng4-gridstack';

const DASH_COMPONENTS = [ContainerComponent, GridComponent, HeaderComponent, FooterComponent];
const GRID_WIDGETS = [ZakautWidgetComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    GridsterModule,
    NgxChartsModule,
    Ng2OdometerModule.forRoot(),
    DynamicModule.withComponents([TestWidgetComponent, Chart2Component]),
    GridStackModule,
    RouterModule.forChild(portalRoutes)
  ],
  providers: [{ provide: 'GridsterItem', useClass: FooterComponent }],
  entryComponents: GRID_WIDGETS,
  declarations: [
    ...DASH_COMPONENTS,
    ...GRID_WIDGETS,
    Chart1Component,
    Chart2Component,
    GridComponent,
    Grid2Component,
    TestWidgetComponent
  ],
  exports: [ContainerComponent]
})
export class PortalModule {}
