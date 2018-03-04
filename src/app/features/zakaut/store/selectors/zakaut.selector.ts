import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ZakautState } from '../reducers';

export const getZakautState = createFeatureSelector<ZakautState>('zakaut');

export const zakautResponseSelector = createSelector(
  getZakautState,
  (state: ZakautState) => state.zakautQueryResponse
);

export const zakautErrorsSelector = createSelector(
  getZakautState,
  (state: ZakautState) => state.errors
);

export const zakautLoadingSelector = createSelector(
  getZakautState,
  (state: ZakautState) => state.isLoading
);
