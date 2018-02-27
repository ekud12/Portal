import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvoicesModule } from '../features/invoices/invoices.module';
import { UserModule } from '../features/user/user.module';
import { RouterModule } from '@angular/router';
import { portalRoutes } from './portal-routes';
import { GridComponent } from './grid/grid.component';
import { GridsterModule } from 'angular-gridster2';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const DASH_COMPONENTS = [
  ContainerComponent,
  GridComponent,
  HeaderComponent,
  FooterComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvoicesModule,
    UserModule,
    GridsterModule,
    RouterModule.forChild(portalRoutes)
  ],
  declarations: [DASH_COMPONENTS],
  exports: [ContainerComponent]
})
export class PortalModule {}