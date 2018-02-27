import { Action } from '@ngrx/store';
import { Sapak } from '../../models/sapak.model';

export const UPDATE_NAME = '[User] Update Name';
export const UPDATE_NAME_FAILURE = '[User] Update Name Fail';
export const UPDATE_NAME_SUCCESS = '[User] Update Name Success';

export const CHANGE_SAPAK = '[Sapak] Change Sapak';
export const CHANGE_SAPAK_FAILURE = '[Sapak] Change Sapak Fail';
export const CHANGE_SAPAK_SUCCESS = '[Sapak] Change Sapak Success';

// User Actions
export class UpdateName implements Action {
  readonly type = UPDATE_NAME;
  constructor(public payload: string) {}
}

export class UpdateNameFail implements Action {
  readonly type = UPDATE_NAME_FAILURE;
}

export class UpdateNameSuccess implements Action {
  readonly type = UPDATE_NAME_SUCCESS;
  constructor(public payload: string) {}
}

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

export type userActions = UpdateName | UpdateNameFail | UpdateNameSuccess;
export type sapakActions = ChangeSapak | ChangeSapakFail | ChangeSapakSuccess;
