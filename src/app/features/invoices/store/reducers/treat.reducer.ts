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
    /** Actiavte Invoice Row */
    case userActions.ACTIVATE_TREATMENT: {
      return {
        ...state,
        activeTreatment: action.payload,
        errors: [],
        isLoading: false
      };
    }

    /** Reset Treatments Submodule */
    case userActions.RESET_INVOICE_ROWS_TREATMENTS: {
      return {
        ...state,
        activeTreatment: null,
        listOfTreatmentsForRow: null,
        isLoading: false,
        errors: []
      };
    }

    /** Get All treatments for A row */
    case userActions.GET_TREATMENTS_FOR_ROW: {
      return {
        ...state,
        listOfTreatmentsForRow: [],
        errors: [],
        isLoading: true
      };
    }
    case userActions.GET_TREATMENTS_FOR_ROW_SUCCESS: {
      const data = action.payload.data.resultSetData;
      return {
        ...state,
        listOfTreatmentsForRow: data,
        errors: [],
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

    /** Create New Treatment Line for Invoice Row */
    case userActions.CREATE_TREATMENT_FOR_ROW: {
      return {
        ...state,
        isLoading: true,
        errors: []
      };
    }
    case userActions.CREATE_TREATMENT_FOR_ROW_SUCCESS: {
      return {
        ...state,
        errors: [],
        isLoading: false
      };
    }
    case userActions.CREATE_TREATMENT_FOR_ROW_FAIL: {
      return {
        ...state,
        errors: action.payload.errors,
        isLoading: false
      };
    }

    /** Delete Treatment for Row */
    case userActions.DELETE_TREATMENT_FOR_ROW: {
      return {
        ...state,
        isLoading: true,
        errors: []
      };
    }
    case userActions.DELETE_TREATMENT_FOR_ROW_SUCCESS: {
      return {
        ...state,
        errors: [],
        isLoading: false
      };
    }
    case userActions.DELETE_TREATMENT_FOR_ROW_FAIL: {
      return {
        ...state,
        errors: action.payload.errors,
        isLoading: false
      };
    }
  }

  return state;
}
