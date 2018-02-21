import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SharedModule } from '../../shared/shared.module';

const comps = [LoginComponent];

@NgModule({
  imports: [CommonModule, SharedModule, UserRoutingModule],
  declarations: [LoginComponent, ChangePassComponent],
  exports: [LoginComponent, ChangePassComponent]
})
export class UserModule {}
