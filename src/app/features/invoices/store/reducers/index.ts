// export * from './invoice.reducer';
// export * from './row.reducer';

import * as fromInvoice from './invoice.reducer';
import * as fromInvoiceRow from './row.reducer';
import { ActionReducerMap } from '@ngrx/store';
export interface InvoicesState {
  invoices: fromInvoice.InvoiceState;
  rows: fromInvoiceRow.InvoiceRowState;
}
export const reducers: ActionReducerMap<InvoicesState> = {
  invoices: fromInvoice.invoiceReducer,
  rows: fromInvoiceRow.rowReducer
};
