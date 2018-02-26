import { Action } from '@ngrx/store';

export const UPDATE_VERSION = '[App] Update Version';
export const UPDATE_VERSION_FAIL = '[App] Update Version Fail';
export const UPDATE_VERSION_SUCCESS = '[App] Update Version Success';

export class UpdateVersion implements Action {
  readonly type = UPDATE_VERSION;
  constructor(public payload: string) {}
}

export class UpdateVersionFail implements Action {
  readonly type = UPDATE_VERSION_FAIL;
}

export class UpdateVersionSuccess implements Action {
  readonly type = UPDATE_VERSION_SUCCESS;
  constructor(public payload: string) {}
}

export type AppAction =
  | UpdateVersion
  | UpdateVersionFail
  | UpdateVersionSuccess;
