import 'mdn-polyfills/String.prototype.padStart';
import { Invoice } from '../../models/new-actions.model';
import * as userActions from '../actions';

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
      // const ret = [
      //   {
      //     billMonth: '12/2018',
      //     invoiceNum: '4015',
      //     totalRowsNum: '1',
      //     invoiceSum: '581',
      //     status: '0',
      //     invoiceType: '0',
      //     typedSum: '450',
      //     exeCode: 'do',
      //     totalOffset: '5',
      //     totalKZZApprl: '6',
      //     rate: '17',
      //     isVat: 'yes',
      //     currency: '$',
      //     vatPer: '0.6',
      //     remark1: 'fml',
      //     remark2: 'fml2'
      //   },
      //   {
      //     billMonth: '12/2018',
      //     invoiceNum: '335',
      //     totalRowsNum: '1',
      //     invoiceSum: '581',
      //     status: '2',
      //     invoiceType: '0',
      //     typedSum: '450',
      //     exeCode: 'do',
      //     totalOffset: '5',
      //     totalKZZApprl: '6',
      //     rate: '17',
      //     isVat: 'yes',
      //     currency: '$',
      //     vatPer: '0.6',
      //     remark1: 'fml',
      //     remark2: 'fml2'
      //   }
      // ,
      // {
      //   billMonth: '07/2018',
      //   invoiceNum: 9335,
      //   totalRowsNum: 1,
      //   invoiceSum: 581,
      //   status: 1,
      //   invoiceType: 0,
      //   typedSum: 450,
      //   exeCode: 'do',
      //   totalOffset: 5,
      //   totalKZZApprl: 6,
      //   rate: 17,
      //   isVat: 'yes',
      //   currency: '$',
      //   vatPer: 0.6,
      //   remark1: 'fml',
      //   remark2: 'fml2'
      // },
      // {
      //   billMonth: '06/2018',
      //   invoiceNum: 95,
      //   totalRowsNum: 12,
      //   invoiceSum: 51,
      //   status: 3,
      //   invoiceType: 0,
      //   typedSum: 4540,
      //   exeCode: 'do',
      //   totalOffset: 5,
      //   totalKZZApprl: 6,
      //   rate: 17,
      //   isVat: 'yes',
      //   currency: 'eu',
      //   vatPer: 0.6,
      //   remark1: 'fml',
      //   remark2: 'fml2'
      // }
      // ];
      return {
        ...state,
        listOfInvoicesForSapak: action.payload.data.resultSetData,
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
