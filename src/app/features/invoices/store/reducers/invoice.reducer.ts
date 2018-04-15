import * as userActions from '../actions';
import 'mdn-polyfills/String.prototype.padStart';
import { Invoice, InvoiceRow } from '../../models/new-actions.model';

export interface InvoiceState {
  activeInvoice: any;
  listOfInvoicesForSapak: Invoice[];
  errors: string[];
  isLoading: boolean;
}

export const invoiceInitialState: InvoiceState = {
  activeInvoice: null,
  listOfInvoicesForSapak: [],
  isLoading: false,
  errors: []
};

export function invoiceReducer(state = invoiceInitialState, action: any): InvoiceState {
  switch (action.type) {
    case userActions.GET_INVOICES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case userActions.GET_INVOICES_SUCCESS: {
      return {
        ...state,
        listOfInvoicesForSapak: action.payload,
        activeInvoice: null,
        isLoading: false
      };
    }
    case userActions.GET_INVOICES_FAIL: {
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    }

    case userActions.ACTIVATE_INVOICE: {
      return {
        ...state,
        activeInvoice: action.payload.invoice
      };
    }

    case userActions.RESET_INVOICES: {
      return {
        ...state,
        activeInvoice: null,
        listOfInvoicesForSapak: [],
        isLoading: false,
        errors: []
      };
    }
  }

  return state;
}

/**
 * Utility functions for Invoice States
 * Format values and such...
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

const getDataKeysValues = dataRaw => {
  const data = [];
  const _id = getId(dataRaw['Custidtype'], dataRaw['Custid']);
  const _name = getName(dataRaw['Custfirstname'], dataRaw['Custsurename']);
  data.push(_name, _id);
  return data;
};
