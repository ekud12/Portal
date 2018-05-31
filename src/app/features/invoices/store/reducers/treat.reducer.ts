import 'mdn-polyfills/String.prototype.padStart';
import { InvoiceTreatment } from '../../models/class-models/objects.model';
import * as userActions from '../actions';

export interface InvoiceRowTreatState {
  activeTreatment: InvoiceTreatment;
  listOfTreatmentsForRow: InvoiceTreatment[];
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
    case userActions.GET_TREATMENTS_FOR_ROW: {
      return {
        ...state,
        isLoading: true
      };
    }
    case userActions.GET_TREATMENTS_FOR_ROW_SUCCESS: {
      const data = action.payload.data.resultSetData;
      return {
        ...state,
        listOfTreatmentsForRow: data,
        isLoading: false
      };
    }
    case userActions.GET_TREATMENTS_FOR_ROW_FAIL: {
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    }
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
  }

  return state;
}
