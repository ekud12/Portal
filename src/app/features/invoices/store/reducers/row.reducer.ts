import 'mdn-polyfills/String.prototype.padStart';

import * as userActions from '../actions';
import { InvoiceRow } from '../../models/class-models/objects.model';
export interface InvoiceRowState {
  activeInvoiceRow: any;
  listOfRowsForInvoice: InvoiceRow[];
  errors: string[];
  isLoading: boolean;
}

export const invoiceRowInitialState: InvoiceRowState = {
  activeInvoiceRow: null,
  listOfRowsForInvoice: null,
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
        listOfRowsForInvoice: null,
        isLoading: false,
        errors: []
      };
    }

    case userActions.GET_INVOICE_ROWS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case userActions.GET_INVOICE_ROWS_SUCCESS: {
      const data = action.payload.data.resultSetData;
      data.map(row => {
        row = addFullNameAndFullId(row);
      });
      return {
        ...state,
        listOfRowsForInvoice: data,
        isLoading: false
      };
    }
    case userActions.GET_INVOICE_ROWS_FAIL: {
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    }
  }
  return state;
}

/**
 * Utility functions for Misc State
 * combine family name with first name and same for ids
 */
const getName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

const getId = (idType, id) => {
  return `${idType}-${id.padStart(9, '0')}`;
};

const addObject = (objects, val, key) => {
  const obj = {};
  obj[key] = val;
  return Object.assign(objects, obj);
};

const addFullNameAndFullId = dataRaw => {
  const _id = getId(dataRaw['custIdTypeField'], dataRaw['custIdField']);
  const _name = getName(dataRaw['custFirstNameField'], dataRaw['custSecNameField']);
  dataRaw.cstFullNameField = _name;
  dataRaw.cstFormattedIdField = _id;
  return dataRaw;
};
