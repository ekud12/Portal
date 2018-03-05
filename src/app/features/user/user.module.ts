import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { userRoutes } from './routes';
import { StoreModule } from '@ngrx/store';

import { effects } from './store';

// import { reducer } from './store';
import { reducer } from '@user/store/*';

import { UserPanelComponent } from './user-panel/user-panel.component';
import { EffectsModule } from '@ngrx/effects';
import { MdePopoverModule } from '@material-extended/mde';
import { UserService } from './user.service';

const comps = [LoginComponent, ChangePassComponent, UserPanelComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdePopoverModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature(effects)
  ],
  providers: [UserService],
  declarations: comps,
  exports: comps
})
export class UserModule {}
