import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetState } from '@portalStore';

export const getWidgetsState = createFeatureSelector<WidgetState>('widgets');

export const widgetsSelector = createSelector(
  getWidgetsState,
  (state: WidgetState) => state.activeWidgets
);
