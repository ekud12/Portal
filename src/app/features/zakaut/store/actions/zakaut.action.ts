import { Action } from '@ngrx/store';
import { ZakautQueryModel } from 'app/features/zakaut/models/zakaut-query.model';

export const CHECK_ZAKAUT = '[Zakaut] Check Zakaut';
export const CHECK_ZAKAUT_SUCCESS = '[Zakaut] Check Zakaut Success';
export const CHECK_ZAKAUT_FAIL = '[Zakaut] Check Zakaut Fail';

// Zakaut Actions
export class CheckZakaut implements Action {
  readonly type = CHECK_ZAKAUT;
  constructor(public payload: ZakautQueryModel) {}
}

export class CheckZakautSuccess implements Action {
  readonly type = CHECK_ZAKAUT_SUCCESS;
  constructor(public payload: any) {}
}

export class CheckZakautFail implements Action {
  readonly type = CHECK_ZAKAUT_FAIL;
  constructor(public payload: any) {}
}

export type userActions = CheckZakaut | CheckZakautSuccess | CheckZakautFail;
