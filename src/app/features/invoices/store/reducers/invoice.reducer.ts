import * as userActions from '../actions';
import 'mdn-polyfills/String.prototype.padStart';

export interface InvoiceState {
  activeInvoice: any;
  errors: string[];
  isLoading: boolean;
}

export const invoiceInitialState: InvoiceState = {
  activeInvoice: null,
  isLoading: false,
  errors: []
};

export function invoiceReducer(state = invoiceInitialState, action: any): InvoiceState {
  switch (action.type) {
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