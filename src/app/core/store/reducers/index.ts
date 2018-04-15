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
import { DashboardState } from '@portalStore';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterState>;
  user: UserState;
  zakaut: ZakautState;
  invoices: InvoicesState;
  dashboard: DashboardState;
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
  dashboard: defaultReducer,
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
      invoice: {
        activeInvoice: null,
        listOfInvoicesForSapak: [],
        isLoading: false,
        errors: []
      },
      rows: {
        activeInvoiceRow: null,
        listOfRowsForInvoice: null,
        isLoading: false,
        errors: []
      },
      treats: {
        activeTreatment: null,
        listOfTreatmentsForRow: null,
        isLoading: false,
        errors: []
      }
    },
    dashboard: {
      activeWidgets: null
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
      { invoices: { invoices: ['listOfInvoicesForSapak', 'activeInvoice'], rows: ['activeInvoiceRow'] } }
    ],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
