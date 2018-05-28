import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InvoiceRowDatePipe } from 'app/shared/utils/invoice-row-date.pipe';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { CardSwipeReportComponent } from './components/card-swipe-report/card-swipe-report.component';
import { InvoiceRowTreatmentsComponent } from './components/invoice-row-treatments/invoice-row-treatments.component';
import { InvoiceRowsComponent } from './components/invoice-rows/invoice-rows.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { KizuzDetailsComponent } from './components/kizuz-details/kizuz-details.component';
import { NewInvoiceRowComponent } from './components/new-invoice-row/new-invoice-row.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { ObligationsByCustIdReportComponent } from './components/obligations-by-cust-id-report/obligations-by-cust-id-report.component';
import { InvoicesContainerComponent } from './invoices-container/invoices-container.component';
import { InvoicesService } from './invoices.service';
import { invoicesRoutes } from './routes';
import { effects, reducers } from './store';
import { GlobalInvoiceDetailsComponent } from './utils/global-invoice-details/global-invoice-details.component';
import { ValidateAndCloseInvoiceComponent } from './utils/validate-and-close-invoice/validate-and-close-invoice.component';

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
  KizuzDetailsComponent,
  GlobalInvoiceDetailsComponent
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
