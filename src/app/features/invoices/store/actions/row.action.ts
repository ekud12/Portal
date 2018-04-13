import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { NewInvoiceRequest } from '../../models/new-actions.model';

export const GET_INVOICE_ROWS = '[Invoice] Get Invoice Rows';
export const GET_INVOICE_ROWS_SUCCESS = '[Invoice] Get Invoices Rows Success';
export const GET_INVOICE_ROWS_FAIL = '[Invoice] Get Invoices Rows Fail';
export const GET_INVOICE_ROWS_COMPLETED = '[Invoice] Get Invoices Rows Completed';

export const ACTIVATE_INVOICE_ROW = '[Invoice] Activate Invoice Row';
export const ACTIVATE_INVOICE_ROW_SUCCESS = '[Invoice] Activate Invoice Row Success';
export const ACTIVATE_INVOICE_ROW_FAIL = '[Invoice] Activate Invoice Row Fail';
export const ACTIVATE_INVOICE_ROW_COMPLETED = '[Invoice] Activate Invoice Row Completed';

export const RESET_INVOICE_ROWS = '[Invoice] Reset Invoice Rows';

/** Actions - Get all rows for  Invoice*/
export class GetInvoiceRows implements Action {
  readonly type = GET_INVOICE_ROWS;
  constructor(public payload: any) {}
}

export class GetInvoiceRowsSuccess implements Action {
  readonly type = GET_INVOICE_ROWS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetInvoiceRowsFail implements Action {
  readonly type = GET_INVOICE_ROWS_FAIL;
  constructor(public payload: any) {}
}

export class GetInvoiceRowsCompleted implements Action {
  readonly type = GET_INVOICE_ROWS_COMPLETED;
}

/** Actions - Activate Invoice Row */
export class ActivateInvoiceRow implements Action {
  readonly type = ACTIVATE_INVOICE_ROW;
  constructor(public payload: any) {
  }
}

export class ActivateInvoiceRowSuccess implements Action {
  readonly type = ACTIVATE_INVOICE_ROW_SUCCESS;
  constructor(public payload: any) {}
}

export class ActivateInvoiceRowFail implements Action {
  readonly type = ACTIVATE_INVOICE_ROW_FAIL;
  constructor(public payload: any) {}
}

export class ActivateInvoiceRowCompleted implements Action {
  readonly type = ACTIVATE_INVOICE_ROW_COMPLETED;
}

export class ResetInvoiceRows implements Action {
  readonly type = RESET_INVOICE_ROWS;
}

export type userRowActions =
  | ActivateInvoiceRow
  | ActivateInvoiceRowSuccess
  | ActivateInvoiceRowFail
  | ActivateInvoiceRowCompleted
  | ResetInvoiceRows;
