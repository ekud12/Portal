import * as userActions from '../actions';
import { ZakautQueryModel } from '../../models/zakaut-query.model';

export interface ZakautState {
  zakautQuery: ZakautQueryModel;
  zakautQueryResponse: string[];
  errors: string[];
  isLoading: boolean;
}

export const zakautInitialState: ZakautState = {
  zakautQuery: null,
  zakautQueryResponse: [],
  isLoading: false,
  errors: []
};

export function zakautReducer(state = zakautInitialState, action: any): ZakautState {
  switch (action.type) {
    case userActions.CHECK_ZAKAUT: {
      return {
        ...state,
        zakautQuery: action.payload,
        zakautQueryResponse: [],
        errors: [],
        isLoading: true
      };
    }
    case userActions.CHECK_ZAKAUT_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        zakautQueryResponse: [...state.zakautQueryResponse, ...action.payload]
      };
    }
    case userActions.CHECK_ZAKAUT_FAIL: {
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
    }
    case userActions.CHECK_ZAKAUT_COMPLETED: {
      return {
        ...state,
        zakautQuery: null,
        isLoading: false
      };
    }

    case userActions.RESET_ZAKAUT: {
      return {
        ...state,
        zakautQueryResponse: [],
        errors: []
      };
    }
  }

  return state;
}
