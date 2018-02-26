import { Action } from '@ngrx/store';

export const UPDATE_NAME = '[User] Update Name';
export const UPDATE_NAME_FAILURE = '[User] Update Name Fail';
export const UPDATE_NAME_SUCCESS = '[User] Update Name Success';

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

export type userActions = UpdateName | UpdateNameFail | UpdateNameSuccess;

//ChangeName
