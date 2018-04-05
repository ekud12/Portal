export * from './router.reducer';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RouterState, routerInitialState } from './router.reducer';
import * as fromRouter from '@ngrx/router-store';

import { ZakautState } from '@zakautStore';
import { UserState } from '@userStore';
import { InvoiceState } from '@invoicesStore';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterState>;
  user: UserState;
  zakaut: ZakautState;
  invoices: InvoiceState;
}

export function defaultReducer<T>(state: T) {
  return state;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  user: defaultReducer,
  zakaut: defaultReducer,
  invoices: defaultReducer
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
    },
    invoices: {
      activeInvoice: null,
      isLoading: false,
      errors: []
    }
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [{ user: ['user', 'activeSapak', 'isLoading'] }],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
