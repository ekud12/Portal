import * as userActions from '../actions';
import { PrintObject } from '../../global-models/print-object.interface';

export interface SharedState {
  printObject: PrintObject;
}

export const sharedInitialState: SharedState = {
  printObject: null
};

export function sharedReducer(state = sharedInitialState, action: any): SharedState {
  switch (action.type) {
    case userActions.SET_PRINT_DATA: {
      return {
        ...state,
        printObject: action.payload
      };
    }
  }
  return state;
}
