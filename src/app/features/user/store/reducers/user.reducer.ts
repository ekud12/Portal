import * as userActions from '../actions';
import { User } from '../../models/user.model';
import { Sapak } from '../../models/sapak.model';
import { sapakActions } from '../actions';
import { Zakaut } from '../../models/permission.model';

export interface UserState {
  user: User;
  activeSapak: Sapak;
  errors: string[];
  isLoading: boolean;
}
export const userInitialState: UserState = {
  user: {
    availableSapakim: [],
    username: null
  },
  activeSapak: null,
  isLoading: false,
  errors: []
};

export function userReducer(state = userInitialState, action: any): UserState {
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
        user: { username: action.payload.userName, availableSapakim: [] },
        activeSapak: {
          kodSapak: '222',
          description: 'ליאל',
          permissions: [
            { permissionType: Zakaut.With_Card_Only, desc: 'ליא ליאל' }
          ]
        },
        isLoading: false
      };
    }
    case userActions.LOGIN_USER_FAILURE: {
      return {
        ...state,
        errors: state.errors.concat(action.payload),
        isLoading: false
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
