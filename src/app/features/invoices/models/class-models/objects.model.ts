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
  PropertyChanged?: string;
  lineNumField?: string;
  custIdTypeField?: string;
  custIdField?: string;
  custSecNameField?: string;
  custFirstNameField?: string;
  commitmentIdField?: string;
  visitNumField?: string;
  amountField?: string;
  typedAmountField?: string;
  treatmentLineField?: string;
  dateField?: Date;
  editionNumField?: string;
  kzzTypeField?: string;
  kzzTypeDescField?: string;
  KzzCodeField?: string;
  kzzDescField?: string;
  kzzField?: string;
  kzzLiterally1Field?: string;
  kzzLiterally2Field?: string;
  kzzLiterally3Field?: string;
  kzzLiterally4Field?: string;
  kzzLiterally5Field?: string;
  kzzLiterally6Field?: string;
  KzzStatusField?: string;
  kzzStatusDescField?: string;
  cstFormattedIdField?: string;
  cstFullNameField?: string;
}



export class InvoiceTreatment {
  constructor() {}
}

export class CardSwipeForSapak {
  PropertyChanged?: string;
  commitmentIdField?: string;
  custFirstNameField?: string;
  custIdField?: string;
  custIdTypeField?: string;
  custLastNameField?: string;
  dateField?: string;
  executionCodeField?: string;
  remark1Field?: string;
  remark2Field?: string;
  requestTypeField?: string;
  supplierCodeField?: string;
  supplierDescField?: string;
  timeField?: string;
  treatmentCodeField?: string;
  userIdField?: string;
  fullName?: string;
  fullID?: string;
}

export class ObligationByCustomerId {
  requestTypeField?: string;
  userField?: string;
  supplierCodeField?: string;
  supplierDescField?: string;
  yearBillMonthField?: string;
  invoiceNumField?: string;
  invoiceTypeField?: string;
  invoiceSumField?: string;
  typedSumField?: string;
  totalRowsNumField?: string;
  exeCodeField?: string;
  totalOffsetField?: string;
  totalKZZApprlField?: string;
  rateField?: string;
  isVatField?: string;
  currencyField?: string;
  vatPerField?: string;
  remark1Field?: string;
  remark2Field?: string;
  statusField?: string;
  rowNumField?: string;
  custIdTypeField?: string;
  custIdField?: string;
  custSureNameField?: string;
  custFirstNameField?: string;
  obligationNumField?: string;
  visitNumField?: string;
  obligationAmountField?: string;
  typedObligationAmountField?: string;
  treatmentRowNumField?: string;
  dateField?: string;
  treatmentCodeField?: string;
  treatmentDescField?: string;
  treatmentNumField?: string;
  obligationAmount2Field?: string;
  typedObligationAmount2Field?: string;
  kzzTypeField?: string;
  kzzTypeDescField?: string;
  kzzCodeField?: string;
  kzzDescField?: string;
  kzzLiterally1Field?: string;
  kzzLiterally2Field?: string;
  kzzLiterally3Field?: string;
  kzzLiterally4Field?: string;
  kzzLiterally5Field?: string;
  kzzLiterally6Field?: string;
  kzzStatusField?: string;
  kzzStatusDescField?: string;
  isDocField?: string;
  PropertyChanged?: string;
}

export enum PrintingOption {
  INVOICES = 1,
  ROWS = 2,
  TREATMENTS = 3,
  SUMMARY = 4,
  CLOSE_INVOICE = 5
}
