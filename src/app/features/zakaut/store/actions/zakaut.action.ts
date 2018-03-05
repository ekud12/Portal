import { Action } from '@ngrx/store';

export const CHECK_ZAKAUT_WITH_CARD = '[Zakaut] Check Zakaut With Card';
export const CHECK_ZAKAUT_WITH_CARD_FAILURE =
  '[Zakaut] Check Zakaut With Card Fail';
export const CHECK_ZAKAUT_WITH_CARD_SUCCESS =
  '[Zakaut] Check Zakaut With Card Success';
export const CHECK_ZAKAUT_WITH_CARD_COMPLETED =
  '[Zakaut] Check Zakaut With Card Completed';

// User Actions
export class CheckZakautWithCard implements Action {
  readonly type = CHECK_ZAKAUT_WITH_CARD;
  constructor(public payload: any) {}
}

export class CheckZakautWithCardFail implements Action {
  readonly type = CHECK_ZAKAUT_WITH_CARD_FAILURE;
  constructor(public payload: any) {}
}

export class CheckZakautWithCardSuccess implements Action {
  readonly type = CHECK_ZAKAUT_WITH_CARD_SUCCESS;
  constructor(public payload: any) {
    console.log(payload);
  }
}
export class CheckZakautWithCardCompleted implements Action {
  readonly type = CHECK_ZAKAUT_WITH_CARD_COMPLETED;
  constructor(public payload: any) {}
}

export type userActions =
  | CheckZakautWithCard
  | CheckZakautWithCardSuccess
  | CheckZakautWithCardFail
  | CheckZakautWithCardCompleted;
