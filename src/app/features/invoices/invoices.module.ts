import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceRowsComponent } from './components/invoice-rows/invoice-rows.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { InvoiceRowTreatmentsComponent } from './components/invoice-row-treatments/invoice-row-treatments.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { invoicesRoutes } from './routes';
import { InvoicesService } from './invoices.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { InvoicesContainerComponent } from './invoices-container/invoices-container.component';

const COMPONENTS = [
  InvoiceRowsComponent,
  NewInvoiceComponent,
  InvoiceRowTreatmentsComponent,
  InvoicesListComponent,
  InvoicesContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    FormsModule,
    RouterModule.forChild(invoicesRoutes),
    StoreModule.forFeature('invoices', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [InvoicesService, DatePipe],
  entryComponents: COMPONENTS,
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class InvoicesModule {}
