import * as userActions from '../actions';
import { User } from '../../models/user.model';
import { Sapak, SapakTreatment, SapakTreatmentsRequest } from '../../models/sapak.model';
import { sapakActions } from '../actions';
import { Zakaut, ZakautDesc } from '../../models/permission.model';
import { activeSapakSelector } from '@userStore';

export interface UserState {
  user: User;
  activeSapak: Sapak;
  errors: string[];
  isLoading: boolean;
}
export const userInitialState: UserState = {
  user: {
    availableSapakim: [],
    username: null
  },
  activeSapak: null,
  isLoading: false,
  errors: []
};

export function userReducer(state = userInitialState, action: any): UserState {
  switch (action.type) {
    case userActions.LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
        errors: []
      };
    }

    /** make login call change sapak to get treatments */
    case userActions.LOGIN_USER_SUCCESS: {
      const suppliersList: Sapak[] = [];
      const rawSuppliersData = JSON.parse(action.payload.suppliersHebrew);
      Object.keys(rawSuppliersData).map(key => {
        suppliersList.push({
          kodSapak: rawSuppliersData[key].SupplierCode,
          description: rawSuppliersData[key].SupplierDesc,
          permissions: {
            zakaut: {
              permissionType: +rawSuppliersData[key].SupplierType,
              desc: ZakautDesc[+rawSuppliersData[key].SupplierType]
            }
          },
          treatments: []
        });
      });
      suppliersList.push({
        kodSapak: '2345234',
        description: 'ספק מסוג אחר 1',
        permissions: {
          zakaut: {
            permissionType: 0,
            desc: 'יכול לבדוק רק בלי לבחור טיפול'
          }
        },
        treatments: []
      });
      suppliersList.push({
        kodSapak: '249998888',
        description: 'ספק מסוג אחר 2',
        permissions: {
          zakaut: {
            permissionType: 2,
            desc: 'מנתח!!!!!'
          }
        },
        treatments: []
      });
      return {
        ...state,
        user: {
          username: action.payload.userName,
          availableSapakim: suppliersList
        },
        activeSapak: suppliersList[0],
        isLoading: false
      };
    }
    case userActions.LOGIN_USER_FAILURE: {
      return {
        ...state,
        errors: state.errors.concat(action.payload),
        isLoading: false
      };
    }
    case userActions.LOGIN_USER_COMPLETED: {
      return {
        ...state
      };
    }
    case userActions.LOGOUT_USER_COMPLETED: {
      return {
        ...state,
        user: { username: null, availableSapakim: [] },
        activeSapak: { kodSapak: '', treatments: [] },
        errors: [],
        isLoading: false
      };
    }

    case userActions.CHANGE_SAPAK: {
      return {
        ...state,
        isLoading: true
      };
    }

    case userActions.CHANGE_SAPAK_DEFAULT: {
      const a = new SapakTreatmentsRequest(state.user.username, state.user.availableSapakim[0].kodSapak);
      action.payload = a;
      return {
        ...state,
        isLoading: true
      };
    }

    case userActions.CHANGE_SAPAK_SUCCESS: {
      const treatments: SapakTreatment[] = [];
      action.payload.map(value => {
        const treat = getNewTreatObject(value);
        treatments.push(treat);
      });
      const newSapakIdentity = state.user.availableSapakim.find(toFind => toFind.kodSapak === action.newSapak);
      newSapakIdentity.treatments = treatments;

      return {
        ...state,
        activeSapak: newSapakIdentity,
        isLoading: false
      };
    }

    case userActions.CHANGE_SAPAK_FAILURE: {
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    }
  }

  return state;
}

const getNewTreatObject = dataRaw => {
  const treat = new SapakTreatment();
  treat.treatCode = dataRaw['treatmentCodeField'];
  treat.treatDesc = dataRaw['treatmentDescField'];
  return treat;
};
