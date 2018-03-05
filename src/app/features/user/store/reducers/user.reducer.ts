import * as userActions from '../actions';
import { User } from '../../models/user.model';
import { Sapak } from '../../models/sapak.model';
import { sapakActions } from '../actions';

export interface UserState {
  user: User;
  activeSapak: Sapak;
  errors: string[];
  isLoading: boolean;
}
export const initialState: UserState = {
  user: {
    availableSapakim: [],
    username: null
  },
  activeSapak: null,
  isLoading: false,
  errors: []
};

export function reducer(state = initialState, action: any): UserState {
  switch (action.type) {
    case userActions.LOGIN_USER: {
      return {
        ...state,
        isLoading: true
      };
    }
    case userActions.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: {
          username: action.payload.username,
          availableSapakim: []
        },
        activeSapak: action.payload.user.availableSapakim[0],
        isLoading: false
      };
    }
    case userActions.LOGIN_USER_FAILURE: {
      return {
        ...state,
        errors: state.errors.concat(action.payload)
      };
    }
    case userActions.LOGIN_USER_COMPLETED: {
      return {
        ...state
      };
    }

    case userActions.CHANGE_SAPAK_SUCCESS: {
      return {
        ...state,
        activeSapak: state.user.availableSapakim.find(
          toFind => toFind.kodSapak === action.payload
        )
      };
    }
  }

  return state;
}
