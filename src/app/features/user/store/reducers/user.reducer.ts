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
        user: {
          username: action.payload.userName,
          availableSapakim: [
            {
              kodSapak: '123',
              description: 'רגיל',
              permissions: {
                zakaut: {
                  permissionType: Zakaut.With_Card_Only,
                  desc: 'עם כרטיס בלבד'
                }
              }
            },
            {
              kodSapak: '456',
              description: 'רגיל לא מנתח',
              permissions: {
                zakaut: {
                  permissionType: Zakaut.With_Card_And_Manual_Not_Surgeon,
                  desc: 'עם כרטיס וידני לא מנתח'
                }
              }
            }
          ]
        },
        activeSapak: {
          kodSapak: '123',
          description: 'רגיל',
          permissions: {
            zakaut: {
              permissionType: Zakaut.With_Card_Only,
              desc: 'עם כרטיס בלבד'
            }
          }
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

    case userActions.LOGOUT_USER_COMPLETED: {
      return {
        ...state,
        user: { username: null, availableSapakim: [] },
        activeSapak: null,
        isLoading: false
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

function b64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}
