import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';

export const GET_TREATMENTS_FOR_ROW = '[Invoice] Get Treatments for Invoice Row';
export const GET_TREATMENTS_FOR_ROW_SUCCESS = '[Invoice] Get Treatments for Invoice Row Success';
export const GET_TREATMENTS_FOR_ROW_FAIL = '[Invoice] Get Treatments for Invoice Row Fail';
export const GET_TREATMENTS_FOR_ROW_COMPLETED = '[Invoice] Get Treatments for Invoice Row Completed';

export const RESET_INVOICE_ROWS_TREATMENTS = '[Invoice] Reset Invoice-Row-Treatments';

/** Actions - Get all rows for  Invoice*/
export class GetTreatmentsForRow implements Action {
  readonly type = GET_TREATMENTS_FOR_ROW;
  constructor(public payload: SapakDataRequest) {}
}

export class GetTreatmentsForRowSuccess implements Action {
  readonly type = GET_TREATMENTS_FOR_ROW_SUCCESS;
  constructor(public payload: any) {}
}

export class GetTreatmentsForRowFail implements Action {
  readonly type = GET_TREATMENTS_FOR_ROW_FAIL;
  constructor(public payload: any) {}
}

export class GetTreatmentsForRowCompleted implements Action {
  readonly type = GET_TREATMENTS_FOR_ROW_COMPLETED;
}

export class ResetInvoiceRowTreatments implements Action {
  readonly type = RESET_INVOICE_ROWS_TREATMENTS;
}

export type userTreatActions =
  | GetTreatmentsForRow
  | GetTreatmentsForRowSuccess
  | GetTreatmentsForRowFail
  | GetTreatmentsForRowCompleted
  | ResetInvoiceRowTreatments;
