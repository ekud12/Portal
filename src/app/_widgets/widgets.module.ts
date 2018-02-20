import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared.module';
import { SpkLatestInvoicesWidgetComponent } from './spk-latest-invoices-widget/spk-latest-invoices-widget.component';

const WIDGET_COMPONENTS = [
  SpkLatestInvoicesWidgetComponent

];

@NgModule({
  imports: [CommonModule, SharedModule],
  entryComponents: WIDGET_COMPONENTS,
  declarations: WIDGET_COMPONENTS,
  exports: WIDGET_COMPONENTS
})
export class WidgetsModule {}
