import * as appStoreActions from '../actions';

export interface AppState {
  version: string;
}

export const initialState: AppState = {
  version: '0.0.1'
};

export function app(
  state = initialState,
  action: appStoreActions.AppAction
): AppState {
  switch (action.type) {
    case appStoreActions.UPDATE_VERSION: {
      return { ...state };
    }
    case appStoreActions.UPDATE_VERSION_SUCCESS: {
      return { ...state, version: action.payload };
    }
    case appStoreActions.UPDATE_VERSION_FAIL: {
      return { ...state };
    }
  }
  return state;
}
