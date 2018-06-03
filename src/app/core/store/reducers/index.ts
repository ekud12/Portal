export * from './router.reducer';

import { InvoicesState } from '@invoicesStore';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { DashboardState } from '@portalStore';
import { SharedState } from '@sharedStore';
import { UserState } from '@userStore';
import { ZakautState } from '@zakautStore';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RouterState, routerInitialState } from './router.reducer';

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
        listOfRowsForInvoice: [],
        isLoading: false,
        errors: []
      },
      treats: {
        activeTreatment: null,
        listOfTreatmentsForRow: [],
        isLoading: false,
        errors: []
      },
      misc: {
        cardSwipes: null,
        obligationsByCustomerId: null,
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
      {
        invoices: {
          invoices: ['listOfInvoicesForSapak', 'activeInvoice'],
          rows: ['listOfRowsForInvoice', 'activeInvoiceRow'],
          treat: ['listOfTreatmentsForRow', 'activeTreatment'],
          misc: ['cardSwipes', 'obligationsByCustomerId']
        }
      }
    ],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
