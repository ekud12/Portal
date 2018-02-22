export interface UserState {
  sapakim: any[];
  username: string;
}

export const initialState: UserState = {
  sapakim: ['123', '22234'],
  username: 'shalom'
};

export function reducer(state = initialState, action: any): UserState {
  //   switch (action.type) {
  //     case fromPizzas.LOAD_PIZZAS: {
  //       return {
  //         ...state,
  //         loading: true
  //       };
  //     }

  //     case fromPizzas.LOAD_PIZZAS_SUCCESS: {
  //       const data = action.payload;
  //       return {
  //         ...state,
  //         loading: false,
  //         loaded: true,
  //         data
  //       };
  //     }

  //     case fromPizzas.LOAD_PIZZAS_FAIL: {
  //       return {
  //         ...state,
  //         loading: false,
  //         loaded: false
  //       };
  //     }
  //   }

  return state;
}


