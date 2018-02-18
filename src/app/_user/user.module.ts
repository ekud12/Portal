import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared.module';
import { RoutingModule } from '../_routing/routing.module';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';

const comps = [LoginComponent];

@NgModule({
  imports: [CommonModule, SharedModule, UserRoutingModule],
  declarations: [LoginComponent, ChangePassComponent],
  exports: [LoginComponent, ChangePassComponent]
})
export class UserModule {}
