import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvoicesModule } from '../features/invoices/invoices.module';
import { UserModule } from '../features/user/user.module';
import { RouterModule } from '@angular/router';
import { portalRoutes } from './portal-routes';
import { GridComponent } from './grid/grid.component';
import { GridsterModule, GridsterItem } from 'angular-gridster2';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpkLatestInvoicesWidgetComponent } from 'app/portal/widgets/spk-latest-invoices-widget/spk-latest-invoices-widget.component';
import { ZakautWidgetComponent } from './widgets/zakaut-widget/zakaut-widget.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

const DASH_COMPONENTS = [ContainerComponent, GridComponent, HeaderComponent, FooterComponent];

const GRID_WIDGETS = [SpkLatestInvoicesWidgetComponent, ZakautWidgetComponent];
@NgModule({
  imports: [CommonModule, SharedModule, UserModule, GridsterModule, RouterModule.forChild(portalRoutes)],
  providers: [{ provide: 'GridsterItem', useClass: FooterComponent }],
  entryComponents: GRID_WIDGETS,
  declarations: [...DASH_COMPONENTS, ...GRID_WIDGETS],
  exports: [ContainerComponent]
})
export class PortalModule {}
