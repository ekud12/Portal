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

export enum PrintingOption {
  INVOICES = 1,
  ROWS = 2,
  TREATMENTS = 3,
  SUMMARY = 4,
  CLOSE_INVOICE = 5
}
