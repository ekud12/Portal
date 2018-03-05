export * from './router.reducer';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { RouterState, routerInitialState } from './router.reducer';

import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterState>;
  user: any;
  zakaut: any;
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
    user: {},
    zakaut: {}
  };
}
