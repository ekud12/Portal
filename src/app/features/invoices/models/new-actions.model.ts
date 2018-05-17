import { SapakTreatment } from '../../user/models/sapak.model';

export class Invoice {
  requestTypeField: string;
  userIdField: string;
  supplierCodeField: string;
  supplierDescField: string;
  PropertyChanged?: string;
  billMonthField: string;
  invoiceNumField: string;
  invoiceTypeField?: string;
  invoiceSumField: string;
  typedSumField?: string;
  totalRowsNumField: string;
  execodeField?: string;
  totalOffsetField?: string;
  totalKzzapprlField?: string;
  rateField?: string;
  isVatField?: string;
  currencyField?: string;
  vatPerField?: string;
  remark1Field?: string;
  remark2Field?: string;
  statusField: string;
}

export class InvoiceRow {
  lineNum: number;
  custIDtype: string;
  custID: number;
  custIDBikoret: number;
  custSecName: string;
  custFirstName: string;
  commitmentId: number;
  visitNum: number;
  amount: number;
  typedAmount: number;
  treatmentLine: number;
  date: Date;
  treatmentCode: string;
  kzzType: string;
  KzzCode: string;
  kzzDesc: string;
  kzzLiterally1: string;
  kzzLiterally2: string;
  kzzLiterally3: string;
  kzzLiterally4: string;
  kzzLiterally5: string;
  kzzLiterally6: string;
  KzzStatus: string;
  kzzStatusDesc: string;
  treatmentDesc: string;
  cstFormattedId: string;
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
  custIdType = '1';
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
    visitNum: string,
    treat: SapakTreatment,
    treatCount: string,
    date: Date,
    price: string
  ) {
    this.commitment = commitment;
    this.custId = custId;
    this.visitNum = visitNum;
    this.treat = treat;
    this.treatCount = treatCount;
    this.date = date;
    this.price = price;
  }
}

export class RowUpdateRequest {
  commitment: string;
  custId: string;
  custIdType: string;
  visitNum: string;
}

export enum PrintingOption {
  INVOICES = 1,
  ROWS = 2,
  TREATMENTS = 3,
  SUMMARY = 4,
  CLOSE_INVOICE = 5
}
