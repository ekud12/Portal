import { Action } from '@ngrx/store';

export const GET_INVOICES = '[Invoice] Get Invoices';
export const GET_INVOICES_SUCCESS = '[Invoice] Get Invoices Success';
export const GET_INVOICES_FAIL = '[Invoice] Get Invoices Fail';
export const GET_INVOICES_COMPLETED = '[Invoice] Get Invoices Completed';

// Zakaut Actions
export class GetInvoices implements Action {
  readonly type = GET_INVOICES;
  constructor(public payload: any) {}
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

export type userActions = GetInvoices | GetInvoicesSuccess | GetInvoicesFail | GetInvoicesCompleted;
