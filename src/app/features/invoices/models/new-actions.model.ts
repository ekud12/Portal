import { SapakTreatment } from '../../user/models/sapak.model';

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

export class NewInvoiceRowRequest {
  commitment: string;
  custId: string;
  custIdType: string;
  visitNum: string;
  treat: SapakTreatment;
  treatCount: string;
  date: Date;
  price: string;
  userName: string;
  kodSapak: string;

  constructor(
    commitment: string,
    custId: string,
    custIdType: string,
    visitNum: string,
    treat: SapakTreatment,
    treatCount: string,
    date: Date,
    price: string
  ) {
    this.commitment = commitment;
    this.custId = custId;
    this.custIdType = custIdType;
    this.visitNum = visitNum;
    this.treat = treat;
    this.treatCount = treatCount;
    this.date = date;
    this.price = price;
  }
}

export enum PrintingOption {
  INVOICES = 1,
  ROWS = 2,
  TREATMENTS = 3,
  SUMMARY = 4,
  CLOSE_INVOICE = 5
}
