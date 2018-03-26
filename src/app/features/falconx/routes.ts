import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { UploadNewInvoiceComponent } from './components/upload-new-invoice/upload-new-invoice.component';

export const falconxRoutes: Routes = [
  {
    path: '',
    component: InvoicesTableComponent,
    children: [
      { path: '', component: PageNotFoundComponent },
      { path: 'newInvoice', component: UploadNewInvoiceComponent },
      { path: '**', redirectTo: '/portal/falconx' }
    ]
  }
];
