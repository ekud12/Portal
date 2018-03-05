import { Action } from '@ngrx/store';
import { Sapak } from '../../models/sapak.model';


export const CHANGE_SAPAK = '[Sapak] Change Sapak';
export const CHANGE_SAPAK_FAILURE = '[Sapak] Change Sapak Fail';
export const CHANGE_SAPAK_SUCCESS = '[Sapak] Change Sapak Success';

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

export type sapakActions = ChangeSapak | ChangeSapakFail | ChangeSapakSuccess;
