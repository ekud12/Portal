import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { userRoutes } from './routes';
import { StoreModule } from '@ngrx/store';

import { effects } from './store';

import { reducer } from './store';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { EffectsModule } from '@ngrx/effects';

const comps = [LoginComponent, ChangePassComponent, UserPanelComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: comps,
  exports: comps
})
export class UserModule {}
