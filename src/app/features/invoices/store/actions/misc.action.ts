import { Action } from '@ngrx/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import {
  ObligationsByCustomerIdAndCommitmentRequest,
  ObligationsByCustomerIdRequest
} from '../../models/requests-models/requests';

export const GET_CARD_SWIPES = '[Invoice] Get Card Swipes';
export const GET_CARD_SWIPES_SUCCESS = '[Invoice] Get Card Swipes Success';
export const GET_CARD_SWIPES_FAIL = '[Invoice] Get Card Swipes Fail';
export const GET_CARD_SWIPES_COMPLETED = '[Invoice] Get Card Swipes Completed';

export const GET_OBLIGATIONS_BY_CUSTOMER_ID = '[Invoice] Get Obligations by Customer Id';
export const GET_OBLIGATIONS_BY_CUSTOMER_ID_SUCCESS = '[Invoice] Get Obligations by Customer Id Success';
export const GET_OBLIGATIONS_BY_CUSTOMER_ID_FAIL = '[Invoice] Get Obligations by Customer Id Fail';
export const GET_OBLIGATIONS_BY_CUSTOMER_ID_COMPLETED = '[Invoice] Get Obligations by Customer Id Completed';

export const GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT = '[Invoice] Get Obligations by Customer ID + Commitment';
export const GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT_SUCCESS = '[Invoice] Get Obligations by ID + Commitment Success';
export const GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT_FAIL = '[Invoice] Get Obligations by ID + Commitment Fail';
export const GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT_COMPLETED = '[Invoice] Get Obligations by ID + Commitment Completed';

export const RESET_MISC = '[Invoice] Reset Misc';

/** Actions - Get All Card Swipes */
export class GetCardSwipes implements Action {
  readonly type = GET_CARD_SWIPES;
  constructor(public payload: SapakDataRequest) {}
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

/** Actions - Get Obligations By customer id */
export class GetObligationsByCustomerId implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID;
  constructor(public payload: ObligationsByCustomerIdRequest) {}
}

export class GetObligationsByCustomerIdSuccess implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class GetObligationsByCustomerIdFail implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_FAIL;
  constructor(public payload: any) {}
}

export class GetObligationsByCustomerIdCompleted implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_COMPLETED;
}

/** Actions - Get Obligations By customer id and commitment */
export class GetObligationsByCustomerIdAndCommitment implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT;
  constructor(public payload: ObligationsByCustomerIdAndCommitmentRequest) {}
}

export class GetObligationsByCustomerIdAndCommitmentSuccess implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetObligationsByCustomerIdAndCommitmentFail implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT_FAIL;
  constructor(public payload: any) {}
}

export class GetObligationsByCustomerIdAndCommitmentCompleted implements Action {
  readonly type = GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT_COMPLETED;
}

/** Reset Invoices Module  */
export class ResetMisc implements Action {
  readonly type = RESET_MISC;
}

export type userMiscActions =
  | GetCardSwipes
  | GetCardSwipesSuccess
  | GetCardSwipesFail
  | GetCardSwipesCompleted
  | GetObligationsByCustomerId
  | GetObligationsByCustomerIdSuccess
  | GetObligationsByCustomerIdFail
  | GetObligationsByCustomerIdCompleted
  | GetObligationsByCustomerIdAndCommitment
  | GetObligationsByCustomerIdAndCommitmentSuccess
  | GetObligationsByCustomerIdAndCommitmentFail
  | GetObligationsByCustomerIdAndCommitmentCompleted
  | ResetMisc;
