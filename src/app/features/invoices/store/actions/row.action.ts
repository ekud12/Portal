import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { NewInvoiceRowRequest, DeleteInvoiceRowRequest } from '../../models/requests-models/requests';

export const GET_INVOICE_ROWS = '[Invoice] Get Invoice Rows';
export const GET_INVOICE_ROWS_SUCCESS = '[Invoice] Get Invoices Rows Success';
export const GET_INVOICE_ROWS_FAIL = '[Invoice] Get Invoices Rows Fail';
export const GET_INVOICE_ROWS_COMPLETED = '[Invoice] Get Invoices Rows Completed';

export const ACTIVATE_INVOICE_ROW = '[Invoice] Activate Invoice Row';
export const ACTIVATE_INVOICE_ROW_SUCCESS = '[Invoice] Activate Invoice Row Success';
export const ACTIVATE_INVOICE_ROW_FAIL = '[Invoice] Activate Invoice Row Fail';
export const ACTIVATE_INVOICE_ROW_COMPLETED = '[Invoice] Activate Invoice Row Completed';

export const CREATE_INVOICE_ROW = '[Invoice] Create Invoice Row';
export const CREATE_INVOICE_ROW_SUCCESS = '[Invoice] Create Invoice Row Success';
export const CREATE_INVOICE_ROW_FAIL = '[Invoice] Create Invoice Row Fail';
export const CREATE_INVOICE_ROW_COMPLETED = '[Invoice] Invoice Row Completed';

export const DELETE_INVOICE_ROW = '[Invoice] Delete Invoice Row';
export const DELETE_INVOICE_ROW_SUCCESS = '[Invoice] Delete Invoice Row Success';
export const DELETE_INVOICE_ROW_FAIL = '[Invoice] Delete Invoice Row Fail';
export const DELETE_INVOICE_ROW_COMPLETED = '[Invoice] Delete Row Completed';

export const RESET_INVOICE_ROWS = '[Invoice] Reset Invoice Rows';

/** Actions - Get all rows for  Invoice*/
export class GetInvoiceRows implements Action {
  readonly type = GET_INVOICE_ROWS;
  constructor(public payload: SapakDataRequest) {}
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
  constructor(public payload: any) {}
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

/** Create New Invoice Row */
export class CreateInvoiceRow implements Action {
  readonly type = CREATE_INVOICE_ROW;
  constructor(public payload: NewInvoiceRowRequest) {}
}
export class CreateInvoiceRowSuccess implements Action {
  readonly type = CREATE_INVOICE_ROW_SUCCESS;
  constructor(public payload: any) {}
}
export class CreateInvoiceRowFail implements Action {
  readonly type = CREATE_INVOICE_ROW_FAIL;
  constructor(public payload: any) {}
}
export class CreateInvoiceRowCompleted implements Action {
  readonly type = CREATE_INVOICE_ROW_COMPLETED;
}

export class DeleteInvoiceRow implements Action {
  readonly type = DELETE_INVOICE_ROW;
  constructor(public payload: DeleteInvoiceRowRequest) {}
}
export class DeleteInvoiceRowSuccess implements Action {
  readonly type = DELETE_INVOICE_ROW_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteInvoiceRowFail implements Action {
  readonly type = DELETE_INVOICE_ROW_FAIL;
  constructor(public payload: any) {}
}
export class DeleteInvoiceRowCompleted implements Action {
  readonly type = DELETE_INVOICE_ROW_COMPLETED;
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
