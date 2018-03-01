import * as userActions from '../actions';
import { User } from '../../models/user.model';
import { Sapak } from '../../models/sapak.model';
import { Zakaut } from '../../models/permission.model';
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
// export const initialState: UserState = {
//   user: {
//     availableSapakim: [
//       {
//         kodSapak: '123',
//         description: 'רגיל',
//         permissions: [
//           {
//             permissionType: Zakaut.With_Card_Only,
//             desc: 'יכול לבצע בדיקת זכאות באמצעות כרטיס בלבד'
//           }
//         ]
//       },
//       {
//         kodSapak: '456',
//         description: 'אינו מנתח',
//         permissions: [
//           {
//             permissionType: Zakaut.With_Card_And_Manual_Not_Surgeon,
//             desc: 'יכול לבצע בדיקת זכאות '
//           }
//         ]
//       },
//       {
//         kodSapak: '789',
//         description: 'מנתח',
//         permissions: [
//           {
//             permissionType: Zakaut.With_Card_And_Manual_Surgeon,
//             desc: 'יכול לבצע בדיקת זכאות '
//           }
//         ]
//       }
//     ],
//     username: 'shalom'
//   },
//   activeSapak: {
//     kodSapak: '000',
//     description: 'דוגמא ראשונית'
//   },
//   errors: []
// };

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
          username: action.payload.user.username,
          availableSapakim: action.payload.user.availableSapakim
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
