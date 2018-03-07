export * from './router.reducer';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { RouterState, routerInitialState } from './router.reducer';

import * as fromRouter from '@ngrx/router-store';
import { ZakautState } from '@zakautStore';
import { UserState } from '@userStore';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterState>;
  user: UserState;
  zakaut: ZakautState;
}

export function defaultReducer<T>(state: T) {
  return state;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  user: defaultReducer,
  zakaut: defaultReducer
};

export function getInitialState(): AppState {
  return {
    router: routerInitialState,
    user: { activeSapak: null, user: null, errors: [], isLoading: false },
    zakaut: {
      zakautQuery: null,
      zakautQueryResponse: null,
      isLoading: false,
      errors: []
    }
  };
}
