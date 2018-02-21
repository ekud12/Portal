import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

const userRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: 'replace', component: ChangePassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
