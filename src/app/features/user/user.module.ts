import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { userRoutes } from './routes';

const comps = [LoginComponent, ChangePassComponent];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(userRoutes)],
  declarations: comps,
  exports: comps
})
export class UserModule {}
