import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared.module';
import { RoutingModule } from '../_routing/routing.module';
import { LoginComponent } from './login/login.component';

const comps = [LoginComponent];

@NgModule({
  imports: [CommonModule, SharedModule, RoutingModule],
  exports: comps,
  declarations: comps
})
export class ViewsModule {}
