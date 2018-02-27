import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

export const getUserState = createFeatureSelector<UserState>('user');
export const userSelector = createSelector(
  getUserState,
  (state: UserState) => state.username
);
export const sapakimSelector = createSelector(
  getUserState,
  (state: UserState) => state.sapakim
);
export const activeSapakSelector = createSelector(
  getUserState,
  (state: UserState) => state.activeSapak
);
