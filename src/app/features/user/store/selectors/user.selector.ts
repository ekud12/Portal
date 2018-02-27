import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

export const getUserState = createFeatureSelector<UserState>('user');
export const userSelector = createSelector(
  getUserState,
  (state: UserState) => state.user
);

export const activeSapakSelector = createSelector(
  getUserState,
  (state: UserState) => state.activeSapak
);
