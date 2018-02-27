import * as userActions from '../actions';
import { User } from '../../models/user.model';
import { Sapak } from '../../models/sapak.model';
import { Zakaut } from '../../models/permission.model';
import { sapakActions } from '../actions';

export interface UserState {
  user: User;
  activeSapak: Sapak;
}

export const initialState: UserState = {
  user: {
    availableSapakim: [
      {
        kodSapak: '123',
        description: 'רגיל',
        permissions: [
          {
            permissionType: Zakaut.With_Card_Only,
            desc: 'יכול לבצע בדיקת זכאות באמצעות כרטיס בלבד'
          }
        ]
      },
      {
        kodSapak: '456',
        description: 'אינו מנתח',
        permissions: [
          {
            permissionType: Zakaut.With_Card_And_Manual_Not_Surgeon,
            desc: 'יכול לבצע בדיקת זכאות '
          }
        ]
      },
      {
        kodSapak: '789',
        description: 'מנתח',
        permissions: [
          {
            permissionType: Zakaut.With_Card_And_Manual_Surgeon,
            desc: 'יכול לבצע בדיקת זכאות '
          }
        ]
      }
    ],
    username: 'shalom'
  },
  activeSapak: {
    kodSapak: '000',
    description: 'דוגמא ראשונית'
  }
};

export function reducer(state = initialState, action: any): UserState {
  switch (action.type) {
    case userActions.UPDATE_NAME_SUCCESS: {
      return {
        ...state,
        user: { username: action.payload }
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
