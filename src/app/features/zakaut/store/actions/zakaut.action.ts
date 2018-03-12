import { Action } from '@ngrx/store';
import { ZakautQueryModel } from 'app/features/zakaut/models/zakaut-query.model';

export const CHECK_ZAKAUT = '[Zakaut] Check Zakaut';
export const CHECK_ZAKAUT_SUCCESS = '[Zakaut] Check Zakaut Success';
export const CHECK_ZAKAUT_FAIL = '[Zakaut] Check Zakaut Fail';
export const CHECK_ZAKAUT_COMPLETED = '[Zakaut] Check Zakaut Completed';

export const RESET_ZAKAUT = '[Zakaut] Reset Zakaut';

// Zakaut Actions
export class CheckZakaut implements Action {
  readonly type = CHECK_ZAKAUT;
  constructor(public payload: ZakautQueryModel) {}
}

export class CheckZakautSuccess implements Action {
  readonly type = CHECK_ZAKAUT_SUCCESS;
  constructor(public payload: string) {}
}

export class CheckZakautFail implements Action {
  readonly type = CHECK_ZAKAUT_FAIL;
  constructor(public payload: any) {}
}

export class CheckZakautCompleted implements Action {
  readonly type = CHECK_ZAKAUT_COMPLETED;
}

export class ResetZakaut implements Action {
  readonly type = RESET_ZAKAUT;
}

export type userActions =
  | CheckZakaut
  | CheckZakautSuccess
  | CheckZakautFail
  | CheckZakautCompleted
  | ResetZakaut;
