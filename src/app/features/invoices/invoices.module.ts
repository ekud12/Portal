import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpkLatestInvoicesWidgetComponent } from './components/spk-latest-invoices-widget/spk-latest-invoices-widget.component';
import { SharedModule } from '../../shared/shared.module';

const WIDGET_COMPONENTS = [SpkLatestInvoicesWidgetComponent];

@NgModule({
  imports: [CommonModule, SharedModule],
  entryComponents: WIDGET_COMPONENTS,
  declarations: WIDGET_COMPONENTS,
  exports: WIDGET_COMPONENTS
})
export class InvoicesModule {}
