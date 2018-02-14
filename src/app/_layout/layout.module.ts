import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../_modules/shared.module';
import { RoutingModule } from '../_routing/routing.module';

const comps = [HeaderComponent];

@NgModule({
  imports: [CommonModule, SharedModule, RoutingModule],
  exports: comps,
  declarations: comps
})
export class LayoutModule {}
