import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '../reducers';

export const getSharedState = createFeatureSelector<SharedState>('shared');

export const currentPrintObjectSelector = createSelector(getSharedState, (state: SharedState) => state.printObject);
