import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { NewInvoiceRequest } from '../../models/new-actions.model';

export const ACTIVATE_INVOICE_ROW = '[Invoice] Activate Invoice Row';
export const ACTIVATE_INVOICE_ROW_SUCCESS = '[Invoice] Activate Invoice Row Success';
export const ACTIVATE_INVOICE_ROW_FAIL = '[Invoice] Activate Invoice Row Fail';
export const ACTIVATE_INVOICE_ROW_COMPLETED = '[Invoice] Activate Invoice Row Completed';

/** Actions - Activate Invoice Row */
export class ActivateInvoiceRow implements Action {
  readonly type = ACTIVATE_INVOICE_ROW;
  constructor(public payload: SapakDataRequest) {}
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

export type userActions = ActivateInvoiceRow | ActivateInvoiceRowSuccess | ActivateInvoiceRowFail | ActivateInvoiceRowCompleted;
