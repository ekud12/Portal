import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromInvoice from '../reducers/invoice.reducer';

export const getInvoiceState = createSelector(fromFeature.getInvoicesState, (state: fromFeature.InvoicesState) => state.invoice);

export const currentInvoiceSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.activeInvoice);

export const allInvoicesSelector = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.listOfInvoicesForSapak
);

export const invoiceErrorsSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.errors);

export const invoiceLoadingSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.isLoading);

export const canDoActionsForInvoiceSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => {
  if (state.activeInvoice.statusField === '1' || state.activeInvoice.statusField === '0') {
    return true;
  } else {
    return false;
  }
});
