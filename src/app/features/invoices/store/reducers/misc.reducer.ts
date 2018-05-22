import 'mdn-polyfills/String.prototype.padStart';
import { Invoice } from '../../models/new-actions.model';
import * as userActions from '../actions';

export interface MiscState {
  cardSwipes: any[];
  errors: string[];
  isLoading: boolean;
}

export const miscInitialState: MiscState = {
  cardSwipes: null,
  isLoading: false,
  errors: []
};

export function miscReducer(state = miscInitialState, action: any): MiscState {
  switch (
    action.type
    /**
     * Get Invoices for Sapak
     */
  ) {
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
