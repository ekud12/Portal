import { Action } from '@ngrx/store';
import { Sapak } from '../../models/sapak.model';

export const CHANGE_SAPAK = '[Sapak] Change Sapak';
export const CHANGE_SAPAK_FAILURE = '[Sapak] Change Sapak Fail';
export const CHANGE_SAPAK_SUCCESS = '[Sapak] Change Sapak Success';

export const GET_SAPAK_TREATMENTS = '[Sapak] Get Treatments for Sapak';
export const GET_SAPAK_TREATMENTS_FAILURE = '[Sapak] Get Treatments for Sapak Fail';
export const GET_SAPAK_TREATMENTS_SUCCESS = '[Sapak] Get Treatments for Sapak Success';

// Sapak Actions
export class ChangeSapak implements Action {
  readonly type = CHANGE_SAPAK;
  constructor(public payload: string) {}
}

export class ChangeSapakFail implements Action {
  readonly type = CHANGE_SAPAK_FAILURE;
}

export class ChangeSapakSuccess implements Action {
  readonly type = CHANGE_SAPAK_SUCCESS;
  constructor(public payload: string) {}
}

export class GetSapakTreatments implements Action {
  readonly type = GET_SAPAK_TREATMENTS;
  constructor(public payload: string) {}
}

export class GetSapakTreatmentsFail implements Action {
  readonly type = GET_SAPAK_TREATMENTS_FAILURE;
}

export class GetSapakTreatmentsSuccess implements Action {
  readonly type = GET_SAPAK_TREATMENTS_SUCCESS;
  constructor(public payload: string) {}
}

export type sapakActions =
  | ChangeSapak
  | ChangeSapakFail
  | ChangeSapakSuccess
  | GetSapakTreatments
  | GetSapakTreatmentsFail
  | GetSapakTreatmentsSuccess;
