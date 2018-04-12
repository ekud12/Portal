import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesState } from '../reducers';
import * as fromFeature from '../reducers';
import * as fromInvoice from '../reducers/invoice.reducer';

export const getInvoiceState = createSelector(fromFeature.getInvoicesState, (state: fromFeature.InvoicesState) => state.invoice);

export const currentInvoiceSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.activeInvoice);

// export const currentInvoiceRowSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.activeInvoiceRow);

export const allInvoicesSelector = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.listOfInvoicesForSapak
);

export const invoiceErrorsSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.errors);

export const invoiceLoadingSelector = createSelector(getInvoiceState, (state: fromInvoice.InvoiceState) => state.isLoading);
