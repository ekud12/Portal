import 'mdn-polyfills/String.prototype.padStart';
import { Invoice } from '../../models/class-models/objects.model';
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
  switch (action.type) {
    case userActions.GET_CARD_SWIPES: {
      return {
        ...state,
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
