import { Routes } from '@angular/router';
import { CardSwipeReportComponent } from './components/card-swipe-report/card-swipe-report.component';
import { InvoiceRowTreatmentsComponent } from './components/invoice-row-treatments/invoice-row-treatments.component';
import { InvoiceRowsComponent } from './components/invoice-rows/invoice-rows.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { KizuzDetailsComponent } from './components/kizuz-details/kizuz-details.component';
import { NewInvoiceRowComponent } from './components/new-invoice-row/new-invoice-row.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { ObligationsByCustIdAndCommitmentReportComponent } from './components/obligations-by-cust-id-and-commitment-report/obligations-by-cust-id-and-commitment-report.component';
import { ObligationsByCustIdReportComponent } from './components/obligations-by-cust-id-report/obligations-by-cust-id-report.component';
import { NewTreatmentForRowComponent } from './components/treatment-for-row/treatment-for-row.component';
import { InvoicesContainerComponent } from './invoices-container/invoices-container.component';

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
      { path: 'treatment', component: NewTreatmentForRowComponent },
      { path: 'cardswipes', component: CardSwipeReportComponent },
      { path: 'obligationsbyid', component: ObligationsByCustIdReportComponent },
      { path: 'obligationsbyidandcommitment', component: ObligationsByCustIdAndCommitmentReportComponent },
      { path: 'kizuz', component: KizuzDetailsComponent },
      { path: 'card', loadChildren: 'app/features/zakaut/zakaut.module#ZakautModule' },
      { path: '**', redirectTo: '/portal/invoice' }
    ]
  }
];
