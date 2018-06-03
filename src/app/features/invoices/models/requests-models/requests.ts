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
  userName: string;
  kodSapak: string;
  billMonth: string;
  invoiceNum: string;
  commitment: string;
  custId?: string;
  custIdType = '1';
  visitNum?: string;
  treat: string;
  treatCount: string;
  date: Date;
  typedObligationAmount?: string;
  constructor() {}
}

export class NewTreatmentForRowRequest {
  constructor() {}
  userName: string;
  kodSapak: string;
  billMonth: string;
  invoiceNum: string;
  rowNum: string;
  treat: string;
  treatCount: string;
  date: Date;
  typedObligationAmount?: string;
  linesNum: string;
}
export class DeleteInvoiceRowRequest {
  userName: string;
  kodSapak: string;
  billMonth: string;
  invoiceNum: string;
  invoiceRow: string;
  constructor() {}
}

export class UpdateInvoiceRowRequest {
  constructor() {}
  userName: string;
  kodSapak: string;
  billMonth: string;
  invoiceNum: string;
  rowNum: string;
  custIdType?: string;
  custId?: string;
  commitmentId?: string;
  visitNum?: string;
  date?: Date;
}

export class UpdatedRowInputFromUser {
  constructor() {}
  custIdType: string;
  custId: string;
  commitment: string;
  visitNum: string;
}
export class ObligationsByCustomerIdRequest {
  constructor() {}
  userName: string;
  kodSapak: string;
  custIdType: string;
  custId: string;
}

export class GetAllRowsForInvoiceRequest {
  constructor() {}
  kodSapak: string;
  userName: string;
  billMonth: string;
  invoiceNum: string;
}

export class GetAllTreatmentsForInvoiceRowRequest {
  constructor() {}
  kodSapak: string;
  userName: string;
  billMonth: string;
  invoiceNum: string;
  rowNum: string;
}
