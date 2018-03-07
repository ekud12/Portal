import * as userActions from '../actions';
import { ZakautQueryModel } from '../../models/zakaut-query.model';

export interface ZakautState {
  zakautQuery: ZakautQueryModel;
  zakautQueryResponse: string;
  errors: string[];
  isLoading: boolean;
}

export const zakautInitialState: ZakautState = {
  zakautQuery: null,
  zakautQueryResponse: null,
  isLoading: false,
  errors: []
};

export function zakautReducer(
  state = zakautInitialState,
  action: any
): ZakautState {
  switch (action.type) {
    case userActions.CHECK_ZAKAUT: {
      return {
        ...state,
        zakautQuery: action.payload,
        isLoading: true
      };
    }
    case userActions.CHECK_ZAKAUT_SUCCESS: {
      return {
        ...state,
        zakautQuery: null,
        zakautQueryResponse: action.payload,
        isLoading: false
      };
    }
    case userActions.CHECK_ZAKAUT_FAIL: {
      return {
        ...state,
        zakautQuery: null,
        errors: [...state.errors, action.payload],
        isLoading: false
      };
    }
  }

  return state;
}
