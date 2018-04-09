import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from '../reducers';

export const getInvoiceState = createFeatureSelector<InvoiceState>('invoices');

export const currentInvoiceSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.activeInvoice);

export const currentInvoiceRowSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.activeInvoiceRow);

export const allInvoicesSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.listOfInvoicesForSapak);

export const invoiceErrorsSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.errors);

export const invoiceLoadingSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.isLoading);
