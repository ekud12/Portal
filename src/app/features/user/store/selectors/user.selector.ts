import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

export const getUserState = createFeatureSelector<UserState>('user');
export const selector = createSelector(
  getUserState,
  (state: UserState) => state.username
);
