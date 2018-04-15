import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '@portalStore';

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const activeWidgetsSelector = createSelector(getDashboardState, (state: DashboardState) => state.activeWidgets);
