import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from '../reducers';

export const getInvoiceState = createFeatureSelector<InvoiceState>('invoices');

export const currentInvoiceSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.activeInvoice);

export const invoiceErrorsSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.errors);

export const invoiceLoadingSelector = createSelector(getInvoiceState, (state: InvoiceState) => state.isLoading);
