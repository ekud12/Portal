import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { InvoiceRowsComponent } from './components/invoice-rows/invoice-rows.component';
import { InvoiceRowTreatmentsComponent } from './components/invoice-row-treatments/invoice-row-treatments.component';
import { InvoicesContainerComponent } from './invoices-container/invoices-container.component';
import { NewInvoiceRowComponent } from './components/new-invoice-row/new-invoice-row.component';

export const invoicesRoutes: Routes = [
  {
    path: '',
    component: InvoicesContainerComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: InvoicesListComponent },
      { path: 'newInvoice', component: NewInvoiceComponent },
      { path: 'rows', component: InvoiceRowsComponent },
      { path: 'newRow', component: NewInvoiceRowComponent },
      { path: 'treatments', component: InvoiceRowTreatmentsComponent },
      { path: '**', redirectTo: '/portal/invoice' }
    ]
  }
];
