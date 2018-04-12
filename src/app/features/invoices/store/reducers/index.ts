// export * from './invoice.reducer';
// export * from './row.reducer';

import * as fromInvoice from './invoice.reducer';
import * as fromInvoiceRow from './row.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
export interface InvoicesState {
  invoice: fromInvoice.InvoiceState;
  rows: fromInvoiceRow.InvoiceRowState;
}
export const reducers: ActionReducerMap<InvoicesState> = {
  invoice: fromInvoice.invoiceReducer,
  rows: fromInvoiceRow.rowReducer
};

export const getInvoicesState = createFeatureSelector<InvoicesState>('invoices');
