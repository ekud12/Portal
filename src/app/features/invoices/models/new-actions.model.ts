export class ElementInvoice {
  invoiceId: number;
  invoiceDate: string;
  invoiceTotalRows: number;
  invoiceTotalSum: number;
  invoiceStatus: number;
}

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

export class GetInvoicesRequest {
  username: string;
  sapakCode: string;
}

export class InvoiceRow {
  constructor() {}
}

export class NewInvoiceTreatment {
  constructor() {}
}
