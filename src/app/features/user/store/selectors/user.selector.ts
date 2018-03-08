import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

export const getUserState = createFeatureSelector<UserState>('user');

export const userSelector = createSelector(
  getUserState,
  (state: UserState) => state.user
);

export const userNameSelector = createSelector(
  getUserState,
  (state: UserState) => state.user.username
);


export const activeSapakSelector = createSelector(
  getUserState,
  (state: UserState) => state.activeSapak
);

export const userErrorsSelector = createSelector(
  getUserState,
  (state: UserState) => state.errors
);

export const userLoadingSelector = createSelector(
  getUserState,
  (state: UserState) => state.isLoading
);


