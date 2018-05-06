import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdePopoverModule } from '@material-extended/mde';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';
import { effects, userReducer } from './store';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserService } from './user.service';
import { TranslateModule } from '@ngx-translate/core';

const comps = [LoginComponent, ChangePassComponent, UserPanelComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdePopoverModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature(effects),
    TranslateModule.forChild()
  ],
  providers: [UserService],
  declarations: comps,
  exports: comps
})
export class UserModule {}
