import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';

export const GET_INVOICES = '[Invoice] Get Invoices';
export const GET_INVOICES_SUCCESS = '[Invoice] Get Invoices Success';
export const GET_INVOICES_FAIL = '[Invoice] Get Invoices Fail';
export const GET_INVOICES_COMPLETED = '[Invoice] Get Invoices Completed';

export const ACTIVATEֹֹֹּ_INVOICE = '[Invoice] Activate Invoice';
export const ACTIVATEֹֹֹּ_INVOICE_SUCCESS = '[Invoice] Activate Invoice Success';
export const ACTIVATEֹֹֹּ_INVOICE_FAIL = '[Invoice] Activate Invoice Fail';
export const ACTIVATEֹֹֹּ_INVOICE_COMPLETED = '[Invoice] Activate Invoice Completed';

export const RESET_INVOICES = '[Invoice] Reset Invoices';

/** Actions - Get All Invoices */
export class GetInvoices implements Action {
  readonly type = GET_INVOICES;
  constructor(public payload: SapakDataRequest) {}
}

export class GetInvoicesSuccess implements Action {
  readonly type = GET_INVOICES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetInvoicesFail implements Action {
  readonly type = GET_INVOICES_FAIL;
  constructor(public payload: any) {}
}

export class GetInvoicesCompleted implements Action {
  readonly type = GET_INVOICES_COMPLETED;
}

/** Actions - Activate Chosen Invoice Globally */
export class ActivateInvoice implements Action {
  readonly type = ACTIVATEֹֹֹּ_INVOICE;
  constructor(public payload: any) {}
}

export class ActivateInvoiceSuccess implements Action {
  readonly type = ACTIVATEֹֹֹּ_INVOICE_SUCCESS;
  constructor(public payload: any) {}
}

export class ActivateInvoiceFail implements Action {
  readonly type = ACTIVATEֹֹֹּ_INVOICE_FAIL;
  constructor(public payload: any) {}
}

export class ActivateInvoiceCompleted implements Action {
  readonly type = ACTIVATEֹֹֹּ_INVOICE_COMPLETED;
}

export class ResetInvoices implements Action {
  readonly type = RESET_INVOICES;
}

export type userActions =
  | GetInvoices
  | GetInvoicesSuccess
  | GetInvoicesFail
  | GetInvoicesCompleted
  | ActivateInvoice
  | ActivateInvoiceSuccess
  | ActivateInvoiceFail
  | ActivateInvoiceCompleted;
