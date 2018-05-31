import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromInvoiceTreatRow from '../reducers/treat.reducer';

export const getInvoiceRowTreatsState = createSelector(
  fromFeature.getInvoicesState,
  (state: fromFeature.InvoicesState) => state.treats
);

export const currentRowTreatmentSelector = createSelector(
  getInvoiceRowTreatsState,
  (state: fromInvoiceTreatRow.InvoiceRowTreatState) => state.activeTreatment
);

export const allTreatmentsForRowSelector = createSelector(
  getInvoiceRowTreatsState,
  (state: fromInvoiceTreatRow.InvoiceRowTreatState) => state.listOfTreatmentsForRow
);

export const treatmentRowLoadingSelector = createSelector(
  getInvoiceRowTreatsState,
  (state: fromInvoiceTreatRow.InvoiceRowTreatState) => state.isLoading
);

export const treatmentRowErrorsSelector = createSelector(
  getInvoiceRowTreatsState,
  (state: fromInvoiceTreatRow.InvoiceRowTreatState) => state.errors
);
