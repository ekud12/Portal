import * as userActions from '../actions';

export interface UserState {
  sapakim: any[];
  username: string;
}

export const initialState: UserState = {
  sapakim: ['123', '22234'],
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
