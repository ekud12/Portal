import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const appSelector = (state: any) => {
  return state.app;
};


