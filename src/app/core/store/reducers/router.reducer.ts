import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export const routerInitialState: fromRouter.RouterReducerState<RouterState> = {
  state: { url: '', queryParams: {}, params: {} },
  navigationId: 0
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterState>
>('routerReducer');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
