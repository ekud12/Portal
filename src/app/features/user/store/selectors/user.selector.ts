import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '..';
import { SapakDataRequest } from '../../models/sapak.model';

export const getUserState = createFeatureSelector<UserState>('user');

export const userSelector = createSelector(getUserState, (state: UserState) => state.user);

export const userNameSelector = createSelector(getUserState, (state: UserState) => state.user.username);

export const activeSapakSelector = createSelector(getUserState, (state: UserState) => state.activeSapak);

export const activeSapakCanEnterPriceSelector = createSelector(getUserState, (state: UserState) => state.activeSapak.exeCode);

export const activeSapakTreatmentsSelector = createSelector(getUserState, (state: UserState) => state.activeSapak.treatments);

export const userErrorsSelector = createSelector(getUserState, (state: UserState) => state.errors);

export const userLoadingSelector = createSelector(getUserState, (state: UserState) => state.isLoading);

export const userNameAndCurrentSapakSelector = createSelector(getUserState, (state: UserState) => {
  const req = new SapakDataRequest();
  req.userName = state.user.username;
  req.kodSapak = state.activeSapak.kodSapak;
  return req;
});
