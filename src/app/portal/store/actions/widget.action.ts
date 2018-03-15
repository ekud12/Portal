import { Action } from '@ngrx/store';
import { CustomGridComponent } from '../../grid/custom-grid-item';

export const ADD_WIDGET = '[Widget] Add Widget';

export class AddWidget implements Action {
  readonly type = ADD_WIDGET;
  constructor(public payload: CustomGridComponent) {}
}

export type Actions = AddWidget;
