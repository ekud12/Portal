import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

const WIDGET_COMPONENTS = [];

@NgModule({
  imports: [CommonModule, SharedModule],
  entryComponents: WIDGET_COMPONENTS,
  declarations: WIDGET_COMPONENTS,
  exports: WIDGET_COMPONENTS
})
export class InvoicesModule {}
