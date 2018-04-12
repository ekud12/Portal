import 'mdn-polyfills/String.prototype.padStart';

import * as userActions from '../actions';

export interface InvoiceRowState {
  activeInvoiceRow: any;
  errors: string[];
  isLoading: boolean;
}

export const invoiceRowInitialState: InvoiceRowState = {
  activeInvoiceRow: null,
  isLoading: false,
  errors: []
};

export function rowReducer(state = invoiceRowInitialState, action: any): InvoiceRowState {
  switch (action.type) {
    case userActions.ACTIVATE_INVOICE_ROW: {
      return {
        ...state,
        activeInvoiceRow: action.payload
      };
    }
    case userActions.RESET_INVOICE_ROWS: {
      return {
        ...state,
        activeInvoiceRow: null,
        isLoading: false,
        errors: []
      };
    }
    // case userActions.GET_INVOICES: {
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // }
    // case userActions.GET_INVOICES_SUCCESS: {
    //   return {
    //     ...state,
    //     listOfInvoicesForSapak: action.payload,
    //     activeInvoice: null,
    //     activeInvoiceRow: null,
    //     isLoading: false
    //   };
    // }
    // case userActions.GET_INVOICES_FAIL: {
    //   return {
    //     ...state,
    //     errors: action.payload,
    //     isLoading: false
    //   };
    // }
  }
  return state;
}
