import * as userActions from '../actions';
import { Sapak } from '../../models/sapak';

export interface UserState {
  sapakim: Sapak[];
  activeSapak: Sapak;
  username: string;
}

export const initialState: UserState = {
  sapakim: [
    { kodSapak: '123', description: 'טרם' },
    { kodSapak: '456', description: 'שיניים' },
    { kodSapak: '789', description: 'אופטיקה' }
  ],
  activeSapak: { kodSapak: '000', description: 'ראשוני' },
  username: 'shalom'
};

export function reducer(state = initialState, action: any): UserState {
  switch (action.type) {
    case userActions.UPDATE_NAME_SUCCESS: {
      return {
        ...state,
        username: action.payload
      };
    }
  }
  return state;
}
