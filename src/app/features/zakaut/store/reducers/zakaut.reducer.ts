import * as userActions from '../actions';
import { ZakautQueryModel, ZakautResponseModel } from '../../models/zakaut-query.model';
import 'mdn-polyfills/String.prototype.padStart';

export interface ZakautState {
  zakautQuery: ZakautQueryModel;
  zakautQueryResponse: ZakautResponseModel;
  errors: string[];
  isLoading: boolean;
}

export const zakautInitialState: ZakautState = {
  zakautQuery: null,
  zakautQueryResponse: null,
  isLoading: false,
  errors: []
};

export function zakautReducer(state = zakautInitialState, action: any): ZakautState {
  switch (action.type) {
    case userActions.CHECK_ZAKAUT: {
      return {
        ...state,
        zakautQuery: action.payload,
        zakautQueryResponse: null,
        errors: [],
        isLoading: true
      };
    }

    case userActions.CHECK_ZAKAUT_SUCCESS: {
      const extraDataRaw = [];

      action.payload[1].map(val => (extraDataRaw[val.Key] = val.Value));
      const dataToFormat = getDataKeysValues(extraDataRaw);

      const objects = {};
      addObject(objects, dataToFormat[0], 'שם לקוח');
      addObject(objects, dataToFormat[1], 'תעודת זהות');

      return {
        ...state,
        zakautQueryResponse: {
          messages: action.payload[0],
          extraData: objects
        }
      };
    }

    case userActions.CHECK_ZAKAUT_FAIL: {
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
    }
    case userActions.CHECK_ZAKAUT_COMPLETED: {
      return {
        ...state,
        zakautQuery: null,
        isLoading: false
      };
    }

    case userActions.RESET_ZAKAUT: {
      return {
        ...state,
        zakautQueryResponse: null,
        errors: [],
        isLoading: false
      };
    }
  }

  return state;
}

/**
 * Utility functions for Zakaut States
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
