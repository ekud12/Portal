import { SapakTreatment } from '../../../user/models/sapak.model';

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

export class ObligationsByCustomerIdRequest {
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
