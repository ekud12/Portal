import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { NewInvoiceRequest } from '../../models/requests-models/requests';

export const GET_CARD_SWIPES = '[Invoice] Get Card Swipes';
export const GET_CARD_SWIPES_SUCCESS = '[Invoice] Get Card Swipes Success';
export const GET_CARD_SWIPES_FAIL = '[Invoice] Get Card Swipes Fail';
export const GET_CARD_SWIPES_COMPLETED = '[Invoice] Get Card Swipes Completed';

export const RESET_MISC = '[Invoice] Reset Misc';

/** Actions - Get All Invoices */
export class GetCardSwipes implements Action {
  readonly type = GET_CARD_SWIPES;
  constructor(public payload: SapakDataRequest) {
  }
}

export class GetCardSwipesSuccess implements Action {
  readonly type = GET_CARD_SWIPES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCardSwipesFail implements Action {
  readonly type = GET_CARD_SWIPES_FAIL;
  constructor(public payload: any) {}
}

export class GetCardSwipesCompleted implements Action {
  readonly type = GET_CARD_SWIPES_COMPLETED;
}

/** Reset Invoices Module  */
export class ResetMisc implements Action {
  readonly type = RESET_MISC;
}

export type userMiscActions = GetCardSwipes | GetCardSwipesSuccess | GetCardSwipesFail | GetCardSwipesCompleted | ResetMisc;
