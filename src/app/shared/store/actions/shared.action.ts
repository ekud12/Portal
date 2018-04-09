import { Action } from '@ngrx/store';

export const SET_PRINT_DATA = '[Shared] Set Print Data';

/** Actions - Get All Invoices */
export class SetPrintData implements Action {
  readonly type = SET_PRINT_DATA;
  constructor(public payload: any) {}
}

export type userActions = SetPrintData;
