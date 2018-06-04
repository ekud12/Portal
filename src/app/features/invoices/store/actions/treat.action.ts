import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoiceTreatment } from '../../models/class-models/objects.model';
import { DeleteTreatmentForRowRequest, NewTreatmentForRowRequest } from '../../models/requests-models/requests';

export const GET_TREATMENTS_FOR_ROW = '[Invoice] Get Treatments for Invoice Row';
export const GET_TREATMENTS_FOR_ROW_SUCCESS = '[Invoice] Get Treatments for Invoice Row Success';
export const GET_TREATMENTS_FOR_ROW_FAIL = '[Invoice] Get Treatments for Invoice Row Fail';
export const GET_TREATMENTS_FOR_ROW_COMPLETED = '[Invoice] Get Treatments for Invoice Row Completed';

export const CREATE_TREATMENT_FOR_ROW = '[Invoice] Create New Treatment Line for Invoice Row';
export const CREATE_TREATMENT_FOR_ROW_SUCCESS = '[Invoice] Create New Treatment Line for Invoice RowSuccess';
export const CREATE_TREATMENT_FOR_ROW_FAIL = '[Invoice] Create New Treatment Line for Invoice Row Fail';
export const CREATE_TREATMENT_FOR_ROW_COMPLETED = '[Invoice] Create New Treatment Line for Invoice Row Completed';

export const DELETE_TREATMENT_FOR_ROW = '[Invoice] Delete New Treatment Line for Invoice Row';
export const DELETE_TREATMENT_FOR_ROW_SUCCESS = '[Invoice] Delete New Treatment Line for Invoice RowSuccess';
export const DELETE_TREATMENT_FOR_ROW_FAIL = '[Invoice] Delete New Treatment Line for Invoice Row Fail';
export const DELETE_TREATMENT_FOR_ROW_COMPLETED = '[Invoice] Delete New Treatment Line for Invoice Row Completed';

export const ACTIVATE_TREATMENT = '[Invoice] Activate Treatment Line for Invoice Row';
export const ACTIVATE_TREATMENT_SUCCESS = '[Invoice] Create New Treatment Line for Invoice RowSuccess';
export const ACTIVATE_TREATMENT_FAIL = '[Invoice] Create New Treatment Line for Invoice Row Fail';
export const ACTIVATE_TREATMENT_COMPLETED = '[Invoice] Create New Treatment Line for Invoice Row Completed';

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

/** Reset Treatments */
export class ResetInvoiceRowTreatments implements Action {
  readonly type = RESET_INVOICE_ROWS_TREATMENTS;
}

/** Create New Treatment Line for Invoice Row */
export class CreateNewTreatmentForInvoiceRow implements Action {
  readonly type = CREATE_TREATMENT_FOR_ROW;
  constructor(public payload: NewTreatmentForRowRequest) {}
}
export class CreateNewTreatmentForInvoiceRowSuccess implements Action {
  readonly type = CREATE_TREATMENT_FOR_ROW_SUCCESS;
  constructor(public payload: any) {}
}
export class CreateNewTreatmentForInvoiceRowFail implements Action {
  readonly type = CREATE_TREATMENT_FOR_ROW_FAIL;
  constructor(public payload: any) {}
}
export class CreateNewTreatmentForInvoiceRowCompleted implements Action {
  readonly type = CREATE_TREATMENT_FOR_ROW_COMPLETED;
}

/** Delete New Treatment Line for Invoice Row */
export class DeleteTreatmentForInvoiceRow implements Action {
  readonly type = DELETE_TREATMENT_FOR_ROW;
  constructor(public payload: DeleteTreatmentForRowRequest) {}
}
export class DeleteTreatmentForInvoiceRowSuccess implements Action {
  readonly type = DELETE_TREATMENT_FOR_ROW_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteTreatmentForInvoiceRowFail implements Action {
  readonly type = DELETE_TREATMENT_FOR_ROW_FAIL;
  constructor(public payload: any) {}
}
export class DeleteTreatmentForInvoiceRowCompleted implements Action {
  readonly type = DELETE_TREATMENT_FOR_ROW_COMPLETED;
}

/** Actions - Activate Treatment */
export class ActivateTreatment implements Action {
  readonly type = ACTIVATE_TREATMENT;
  constructor(public payload: InvoiceTreatment) {}
}
export class ActivateTreatmentSuccess implements Action {
  readonly type = ACTIVATE_TREATMENT_SUCCESS;
  constructor(public payload: any) {}
}
export class ActivateTreatmentFail implements Action {
  readonly type = ACTIVATE_TREATMENT_FAIL;
  constructor(public payload: any) {}
}
export class ActivateTreatmentCompleted implements Action {
  readonly type = ACTIVATE_TREATMENT_COMPLETED;
}
export type userTreatActions =
  | GetTreatmentsForRow
  | GetTreatmentsForRowSuccess
  | GetTreatmentsForRowFail
  | GetTreatmentsForRowCompleted
  | CreateNewTreatmentForInvoiceRow
  | CreateNewTreatmentForInvoiceRowSuccess
  | CreateNewTreatmentForInvoiceRowFail
  | CreateNewTreatmentForInvoiceRowCompleted
  | DeleteTreatmentForInvoiceRow
  | DeleteTreatmentForInvoiceRowSuccess
  | DeleteTreatmentForInvoiceRowFail
  | DeleteTreatmentForInvoiceRowCompleted
  | ActivateTreatment
  | ActivateTreatmentSuccess
  | ActivateTreatmentFail
  | ActivateTreatmentCompleted
  | ResetInvoiceRowTreatments;
