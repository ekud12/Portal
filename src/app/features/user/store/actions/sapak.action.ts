import { Action } from '@ngrx/store';
import { Sapak } from '../../models/sapak.model';

export const CHANGE_SAPAK = '[Sapak] Change Sapak';
export const CHANGE_SAPAK_DEFAULT = '[Sapak] Change Sapak DEFAULT';
export const CHANGE_SAPAK_FAILURE = '[Sapak] Change Sapak Fail';
export const CHANGE_SAPAK_SUCCESS = '[Sapak] Change Sapak Success';


// Sapak Actions
export class ChangeSapak implements Action {
  readonly type = CHANGE_SAPAK;
  constructor(public payload: any) {}
}

export class ChangeSapakDefault implements Action {
  readonly type = CHANGE_SAPAK_DEFAULT;
  constructor(public payload: any) {}
}

export class ChangeSapakFail implements Action {
  readonly type = CHANGE_SAPAK_FAILURE;
  constructor(public payload: any) {}
}

export class ChangeSapakSuccess implements Action {
  readonly type = CHANGE_SAPAK_SUCCESS;
  constructor(public payload: any, public newSapak: string) {}
}

export type sapakActions = ChangeSapak | ChangeSapakFail | ChangeSapakSuccess;
