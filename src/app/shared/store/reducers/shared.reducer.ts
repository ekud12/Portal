import * as userActions from '../actions';

export interface SharedState {
  printObject: any;
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
