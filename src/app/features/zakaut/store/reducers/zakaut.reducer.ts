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

export function zakautReducer(state = zakautInitialState, action: any): ZakautState {
  switch (action.type) {
    case userActions.CHECK_ZAKAUT_WITH_CARD: {
      return {
        ...state,
        isLoading: true
      };
    }
    case userActions.CHECK_ZAKAUT_WITH_CARD_SUCCESS: {
      return {
        ...state,
        zakautQueryResponse: action.payload
      };
    }
    case userActions.CHECK_ZAKAUT_WITH_CARD_FAILURE: {
      return {
        ...state,
        errors: state.errors.concat(action.payload)
      };
    }
    case userActions.CHECK_ZAKAUT_WITH_CARD_COMPLETED: {
      return {
        ...state,
        isLoading: false
      };
    }
  }

  return state;
}
