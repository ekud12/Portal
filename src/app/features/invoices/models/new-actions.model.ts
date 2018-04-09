export class ElementInvoice {
  invoiceId: number;
  invoiceDate: string;
  invoiceTotalRows: number;
  invoiceTotalSum: number;
  invoiceStatus: number;
}

export class Invoice {
  billMonth: number;
  invoiceType: number;
  invoiceSum: string;
  typedSum: number;
  totalRowsNum: number;
  exeCode: string;
  totalOffset: number;
  totalKZZApprl: number;
  rate: number;
  isVat: string;
  currency: string;
  vatPer: number;
  remark1: string;
  remark2: string;
  status: string;
}

export class GetInvoicesRequest {
  username: string;
  sapakCode: string;
}

export class NewInvoiceRow {
  constructor() {}
}

export class NewInvoiceTreatment {
  constructor() {}
}
