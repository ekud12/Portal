import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesState } from '../reducers';
import * as fromFeature from '../reducers';

export const getInvoiceRowTreatsState = createSelector(
  fromFeature.getInvoicesState,
  (state: fromFeature.InvoicesState) => state.treats
);

// export const currentInvoiceRowSelector = createSelector(
//   getInvoiceRowState,
//   (state: fromInvoiceRow.InvoiceRowState) => state.activeInvoiceRow
// );

// export const allInvoiceRowsSelector = createSelector(
//   getInvoiceRowState,
//   (state: fromInvoiceRow.InvoiceRowState) => state.listOfRowsForInvoice
// );
