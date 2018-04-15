import * as userActions from '../actions';
import 'mdn-polyfills/String.prototype.padStart';

export interface DashboardState {
  activeWidgets: any[];
}

export const widgetsInitialState: DashboardState = {
  activeWidgets: null
};

export function widgetReducer(state = widgetsInitialState, action: any): DashboardState {
  switch (action.type) {
    case userActions.ADD_WIDGET: {
      return {
        ...state,
        activeWidgets: action.payload
      };
    }
    case userActions.INIT_WIDGETS_SUCCESS: {
      return {
        ...state,
        activeWidgets: action.payload
      };
    }
  }
  return state;
}
