import * as gridActions from '../actions';
import { CustomGridComponent } from '../../grid/custom-grid-item';

export interface WidgetState {
  activeWidgets: CustomGridComponent[];
}

export const widgetInitialState: WidgetState = {
  activeWidgets: []
};

export function widgetReducer(
  state = widgetInitialState,
  action: any
): WidgetState {
  switch (action.type) {
    case gridActions.ADD_WIDGET: {
      return {
        ...state
      };
    }
  }

  return state;
}
