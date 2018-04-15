import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromInvoice from './invoice.reducer';
import * as fromInvoiceRow from './row.reducer';
import * as fromInvoiceRowTreat from './treat.reducer';

export interface InvoicesState {
  invoice: fromInvoice.InvoiceState;
  rows: fromInvoiceRow.InvoiceRowState;
  treats: fromInvoiceRowTreat.InvoiceRowTreatState;
}
export const reducers: ActionReducerMap<InvoicesState> = {
  invoice: fromInvoice.invoiceReducer,
  rows: fromInvoiceRow.rowReducer,
  treats: fromInvoiceRowTreat.treatReducer
};

export const getInvoicesState = createFeatureSelector<InvoicesState>('invoices');
