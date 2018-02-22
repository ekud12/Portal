import { createSelector } from '@ngrx/store';
import { AppState } from '..';

// export const getAppState = createSelector<AppState>();
// export const selector = createSelector(
//   getUserState,
//   (state: ) => state.username
// );

const appSelector = (state: any) => {
  return state.app;
};

export const versionSelector = createSelector(appSelector, (state: AppState) => state.version);
