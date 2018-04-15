import { Action } from '@ngrx/store';

export const INIT_WIDGETS = '[Dashboard] Initiliaze Widgets';
export const INIT_WIDGETS_SUCCESS = '[Dashboard] Initiliaze Widgets Success';
export const ADD_WIDGET = '[Dashboard] Add Widget';

export class InitWidgets implements Action {
  readonly type = INIT_WIDGETS;
  // constructor(public payload: any) {}
}

export class InitWidgetsSuccess implements Action {
  readonly type = INIT_WIDGETS_SUCCESS;
  constructor(public payload: any) {}
}

export class AddWidget implements Action {
  readonly type = ADD_WIDGET;
  constructor(public payload: any) {}
}

export type userActions = AddWidget;
