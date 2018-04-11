import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesState } from '../reducers';

export const getInvoiceState = createFeatureSelector<InvoicesState>('invoices');

export const currentInvoiceSelector = createSelector(getInvoiceState, (state: InvoicesState) => state.invoices.activeInvoice);

export const currentInvoiceRowSelector = createSelector(getInvoiceState, (state: InvoicesState) => state.rows.activeInvoiceRow);

export const allInvoicesSelector = createSelector(getInvoiceState, (state: InvoicesState) => state.invoices.listOfInvoicesForSapak);

export const invoiceErrorsSelector = createSelector(getInvoiceState, (state: InvoicesState) => state.invoices.errors);

export const invoiceLoadingSelector = createSelector(getInvoiceState, (state: InvoicesState) => state.invoices.isLoading);
