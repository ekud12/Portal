export interface AppState {
  version: string;
}

export const initialState: AppState = {
  version: '0.0.1'
};

export function app(state = initialState) {
  console.log('rr' + state);

  return state;
}
