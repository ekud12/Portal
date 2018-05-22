import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesState } from '../reducers';
import * as fromFeature from '../reducers';
import * as fromMisc from '../reducers/misc.reducer';

export const getMiscState = createSelector(fromFeature.getInvoicesState, (state: fromFeature.InvoicesState) => state.misc);

export const cardSwipesSelector = createSelector(getMiscState, (state: fromMisc.MiscState) => state.cardSwipes);

export const miscErrorsSelector = createSelector(getMiscState, (state: fromMisc.MiscState) => state.errors);

export const miscLoadingSelector = createSelector(getMiscState, (state: fromMisc.MiscState) => state.isLoading);
