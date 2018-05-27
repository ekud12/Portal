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
import { NewInvoiceRowComponent } from './components/new-invoice-row/new-invoice-row.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ZakautModule } from 'app/features/zakaut/zakaut.module';
import { InvoiceRowDatePipe } from 'app/shared/utils/invoice-row-date.pipe';
import { CardSwipeReportComponent } from './components/card-swipe-report/card-swipe-report.component';
import { ValidateAndCloseInvoiceComponent } from './utils/validate-and-close-invoice/validate-and-close-invoice.component';
import { ObligationsByCustIdReportComponent } from './components/obligations-by-cust-id-report/obligations-by-cust-id-report.component';
import { KizuzDetailsComponent } from './components/kizuz-details/kizuz-details.component';

const COMPONENTS = [
  InvoiceRowsComponent,
  NewInvoiceComponent,
  InvoiceRowTreatmentsComponent,
  InvoicesListComponent,
  InvoicesContainerComponent,
  NewInvoiceRowComponent,
  CardSwipeReportComponent,
  ValidateAndCloseInvoiceComponent,
  ObligationsByCustIdReportComponent,
  KizuzDetailsComponent
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
  providers: [InvoicesService, DatePipe, InvoiceRowDatePipe, { provide: MAT_DATE_LOCALE, useValue: 'he' }],
  entryComponents: COMPONENTS,
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class InvoicesModule {}
