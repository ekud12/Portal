import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { NewInvoiceRequest } from '../../models/requests-models/requests';

export const GET_INVOICES = '[Invoice] Get Invoices';
export const GET_INVOICES_SUCCESS = '[Invoice] Get Invoices Success';
export const GET_INVOICES_FAIL = '[Invoice] Get Invoices Fail';
export const GET_INVOICES_COMPLETED = '[Invoice] Get Invoices Completed';

export const ACTIVATE_INVOICE = '[Invoice] Activate Invoice';
export const ACTIVATE_INVOICE_SUCCESS = '[Invoice] Activate Invoice Success';
export const ACTIVATE_INVOICE_FAIL = '[Invoice] Activate Invoice Fail';
export const ACTIVATE_INVOICE_COMPLETED = '[Invoice] Activate Invoice Completed';

export const CREATE_INVOICE = '[Invoice] Create Invoice';
export const CREATE_INVOICE_SUCCESS = '[Invoice] Create Invoice Success';
export const CREATE_INVOICE_FAIL = '[Invoice] Create Invoice Fail';
export const CREATE_INVOICE_COMPLETED = '[Invoice] Create Invoice Completed';

export const RESET_INVOICES = '[Invoice] Reset Invoices';

/** Actions - Get All Invoices */
export class GetInvoices implements Action {
  readonly type = GET_INVOICES;
  constructor(public payload: SapakDataRequest) {
  }
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
  readonly type = ACTIVATE_INVOICE;
  constructor(public payload: SapakDataRequest) {}
}

export class ActivateInvoiceSuccess implements Action {
  readonly type = ACTIVATE_INVOICE_SUCCESS;
  constructor(public payload: any) {}
}

export class ActivateInvoiceFail implements Action {
  readonly type = ACTIVATE_INVOICE_FAIL;
  constructor(public payload: any) {}
}

export class ActivateInvoiceCompleted implements Action {
  readonly type = ACTIVATE_INVOICE_COMPLETED;
}

/** Actions - Create new Invoice */
export class CreateInvoice implements Action {
  readonly type = CREATE_INVOICE;
  constructor(public payload: NewInvoiceRequest) {}
}

export class CreateInvoiceSuccess implements Action {
  readonly type = CREATE_INVOICE_SUCCESS;
  constructor(public payload: any, public reqRef) {
  }
}

export class CreateInvoiceFail implements Action {
  readonly type = CREATE_INVOICE_FAIL;
  constructor(public payload: any) {
  }
}

export class CreateInvoiceCompleted implements Action {
  readonly type = CREATE_INVOICE_COMPLETED;
}

/** Reset Invoices Module  */
export class ResetInvoices implements Action {
  readonly type = RESET_INVOICES;
}

export type userInvoiceActions =
  | GetInvoices
  | GetInvoicesSuccess
  | GetInvoicesFail
  | GetInvoicesCompleted
  | ActivateInvoice
  | ActivateInvoiceSuccess
  | ActivateInvoiceFail
  | ActivateInvoiceCompleted
  | CreateInvoice
  | CreateInvoiceSuccess
  | CreateInvoiceFail
  | CreateInvoiceCompleted;
