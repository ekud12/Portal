import 'mdn-polyfills/String.prototype.padStart';

import * as userActions from '../actions';

export interface InvoiceRowTreatState {
  activeTreatment: any;
  listOfTreatmentsForRow: any[];
  errors: string[];
  isLoading: boolean;
}

export const invoiceRowTreatInitialState: InvoiceRowTreatState = {
  activeTreatment: null,
  listOfTreatmentsForRow: null,
  isLoading: false,
  errors: []
};

export function treatReducer(state = invoiceRowTreatInitialState, action: any): InvoiceRowTreatState {
  switch (action.type) {
  //   case userActions.ACTIVATE_INVOICE_ROW: {
  //     return {
  //       ...state,
  //       activeInvoiceRow: action.payload
  //     };
  //   }
  //   case userActions.RESET_INVOICE_ROWS: {
  //     return {
  //       ...state,
  //       activeInvoiceRow: null,
  //       listOfRowsForInvoice: null,
  //       isLoading: false,
  //       errors: []
  //     };
  //   }

  //   case userActions.GET_INVOICE_ROWS: {
  //     return {
  //       ...state,
  //       isLoading: true
  //     };
  //   }
  //   case userActions.GET_INVOICE_ROWS_SUCCESS: {
  //     return {
  //       ...state,
  //       listOfRowsForInvoice: action.payload,
  //       isLoading: false
  //     };
  //   }
  //   case userActions.GET_INVOICE_ROWS_FAIL: {
  //     return {
  //       ...state,
  //       errors: action.payload,
  //       isLoading: false
  //     };
  //   }
  }
  return state;
}
