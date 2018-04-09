import { Action } from '@ngrx/store';
import { PrintObject } from '../../global-models/print-object.interface';

export const SET_PRINT_DATA = '[Shared] Set Print Data';
export const RESET_PRINT_DATA = '[Shared] Reset Print Data';

/** Actions - Get All Invoices */
export class SetPrintData implements Action {
  readonly type = SET_PRINT_DATA;
  constructor(public payload: PrintObject) {}
}

export class ResetPrintData implements Action {
  readonly type = RESET_PRINT_DATA;
}

export type userActions = SetPrintData | ResetPrintData;
