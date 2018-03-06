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

const WIDGET_COMPONENTS = [];
const ACTION_COMPONENTS = [ZakautActionsComponent];

const ZAKAUT_COMPONENTS = [...WIDGET_COMPONENTS, ...ACTION_COMPONENTS];

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
  entryComponents: [ZakautActionsComponent],
  providers: [ZakautService],
  declarations: [ZakautActionsComponent],
  exports: [ZakautActionsComponent]
})
export class ZakautModule {}
