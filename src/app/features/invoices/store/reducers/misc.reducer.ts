import 'mdn-polyfills/String.prototype.padStart';
import { Invoice, CardSwipeForSapak } from '../../models/class-models/objects.model';
import * as userActions from '../actions';

export interface MiscState {
  cardSwipes: CardSwipeForSapak[];
  obligationsByCustomerId: any[];
  errors: string[];
  isLoading: boolean;
}

export const miscInitialState: MiscState = {
  cardSwipes: [],
  obligationsByCustomerId: [],
  isLoading: false,
  errors: []
};

export function miscReducer(state = miscInitialState, action: any): MiscState {
  switch (action.type) {
    case userActions.GET_CARD_SWIPES: {
      return {
        ...state,
        cardSwipes: [],
        isLoading: true
      };
    }
    case userActions.GET_CARD_SWIPES_SUCCESS: {
      const arr = action.payload.data.resultSetData;
      arr.map(row => {
        row = addFullNameAndFullId(row);
      });
      return {
        ...state,
        cardSwipes: arr,
        isLoading: false
      };
    }
    case userActions.GET_CARD_SWIPES_FAIL: {
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    }

    /** Reducer for Obligations by customer ID */
    case userActions.GET_OBLIGATIONS_BY_CUSTOMER_ID: {
      return {
        ...state,
        obligationsByCustomerId: [],
        isLoading: true
      };
    }
    case userActions.GET_OBLIGATIONS_BY_CUSTOMER_ID_SUCCESS: {
      const arr = action.payload.data.resultSetData;
      return {
        ...state,
        obligationsByCustomerId: arr,
        isLoading: false
      };
    }
    case userActions.GET_OBLIGATIONS_BY_CUSTOMER_ID_FAIL: {
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    }

    /** Reset Misc submodule */
    case userActions.RESET_MISC: {
      return {
        ...state,
        cardSwipes: [],
        obligationsByCustomerId: [],
        isLoading: false,
        errors: []
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
  return `${lastName} ${firstName}`;
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
  const _name = getName(dataRaw['custFirstNameField'], dataRaw['custLastNameField']);
  dataRaw.fullName = _name;
  dataRaw.fullID = _id;
  return dataRaw;
};
