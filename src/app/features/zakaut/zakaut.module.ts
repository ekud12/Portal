import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZakautActionsComponent } from './components/zakaut-actions/zakaut-actions.component';
import { RouterModule } from '@angular/router';
import { zakautRoutes } from './routes';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserModule } from '../user/user.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './store';
import { zakautReducer } from './store';
import { ZakautService } from './zakaut.service';

const ACTION_COMPONENTS = [ZakautActionsComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    FormsModule,
    RouterModule.forChild(zakautRoutes),
    StoreModule.forFeature('zakaut', zakautReducer),
    EffectsModule.forFeature(effects)
  ],
  entryComponents: ACTION_COMPONENTS,
  providers: [ZakautService],
  declarations: ACTION_COMPONENTS,
  exports: ACTION_COMPONENTS
})
export class ZakautModule {}
