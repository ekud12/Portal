import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { InvoiceRowsComponent } from './components/invoice-rows/invoice-rows.component';
import { InvoiceRowTreatmentsComponent } from './components/invoice-row-treatments/invoice-row-treatments.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';

export const invoicesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: InvoicesListComponent },
      { path: 'new', component: NewInvoiceComponent },
      { path: 'rows', component: InvoiceRowsComponent },
      { path: 'treatments', component: InvoiceRowTreatmentsComponent },
      { path: 'print', component: PrintLayoutComponent },
      { path: '**', redirectTo: '/portal/invoice' }
    ]
  }
];
