import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZakautActionsComponent } from './components/zakaut-actions/zakaut-actions.component';
import { RouterModule } from '@angular/router';
import { zakautRoutes } from './routes';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

const WIDGET_COMPONENTS = [];
const ACTION_COMPONENTS = [ZakautActionsComponent];

const ZAKAUT_COMPONENTS = [...WIDGET_COMPONENTS, ...ACTION_COMPONENTS];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(zakautRoutes)
  ],
  entryComponents: [ZakautActionsComponent],
  declarations: [ZakautActionsComponent],
  exports: [ZakautActionsComponent]
})
export class ZakautModule {}
