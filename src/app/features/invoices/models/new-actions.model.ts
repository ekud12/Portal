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
  invoiceNum: string;
  invoiceRemarks: string;
  userName: string;
  kodSapak: string;
  constructor(date: string, id: string, remark: string) {
    this.invoiceDate = date;
    this.invoiceNum = id;
    this.invoiceRemarks = remark;
  }
}

export enum PrintingOption {
  INVOICE = 1,
  ROWS = 2,
  TREATMENTS = 3,
  SUMMARY = 4,
  CLOSE_INVOICE = 5
}
