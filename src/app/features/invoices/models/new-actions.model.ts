export class Invoice {
  billMonth: string;
  invoiceNum: number;
  invoiceType?: number;
  invoiceSum: number;
  typedSum?: number;
  totalRowsNum: number;
  exeCode?: string;
  totalOffset?: number;
  totalKZZApprl?: number;
  rate?: number;
  isVat?: string;
  currency?: string;
  vatPer?: number;
  remark1?: string;
  remark2?: string;
  status: number;
}

export class InvoiceRow {
  constructor() {}
}

export class InvoiceTreatment {
  constructor() {}
}

export class NewInvoiceRequest {
  invoiceDate: string;
  _invoiceNum: string;
  invoiceRemarks: string;
  constructor(date: string, id: string, remark: string) {
    this.invoiceDate = date;
    this._invoiceNum = id;
    this.invoiceRemarks = remark;
  }

  get invoiceNum() {
    return this._invoiceNum;
  }
  set invoiceNum(num) {
    if (num === '') {
      this._invoiceNum = null;
    } else {
      this._invoiceNum = num;
    }
  }
}
