export * from './router.reducer';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RouterState, routerInitialState } from './router.reducer';
import * as fromRouter from '@ngrx/router-store';

import { ZakautState } from '@zakautStore';
import { UserState } from '@userStore';
import { InvoicesState } from '@invoicesStore';
import { SharedState } from '@sharedStore';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterState>;
  user: UserState;
  zakaut: ZakautState;
  invoices: InvoicesState;
  shared: SharedState;
}

export function defaultReducer<T>(state: T) {
  return state;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  user: defaultReducer,
  zakaut: defaultReducer,
  invoices: defaultReducer,
  shared: defaultReducer
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
      invoices: {
        activeInvoice: null,

        listOfInvoicesForSapak: [],
        isLoading: false,
        errors: []
      },
      rows: {
        activeInvoiceRow: null,
        isLoading: false,
        errors: []
      }
    },
    shared: {
      printObject: null
    }
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { user: ['user', 'activeSapak', 'isLoading'] },
      { invoices: ['listOfInvoicesForSapak', 'activeInvoiceRow', 'activeInvoice'] }
    ],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
