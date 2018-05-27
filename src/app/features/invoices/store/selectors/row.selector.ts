import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesState } from '../reducers';
import * as fromFeature from '../reducers';
import * as fromInvoiceRow from '../reducers/row.reducer';

export const getInvoiceRowState = createSelector(fromFeature.getInvoicesState, (state: fromFeature.InvoicesState) => state.rows);

export const currentInvoiceRowSelector = createSelector(
  getInvoiceRowState,
  (state: fromInvoiceRow.InvoiceRowState) => state.activeInvoiceRow
);

export const allInvoiceRowsSelector = createSelector(
  getInvoiceRowState,
  (state: fromInvoiceRow.InvoiceRowState) => state.listOfRowsForInvoice
);

export const invoiceRowsErrorsSelector = createSelector(
  getInvoiceRowState,
  (state: fromInvoiceRow.InvoiceRowState) => state.errors
);

export const invoiceRowsLoadingSelector = createSelector(
  getInvoiceRowState,
  (state: fromInvoiceRow.InvoiceRowState) => state.isLoading
);
