import { Permission } from './permission.model';
import { InvoiceRow, Invoice } from '../../invoices/models/class-models/objects.model';

export class Sapak {
  kodSapak: string;
  description?: string;
  permissions?: { [key: string]: Permission };
  treatments?: SapakTreatment[];
  exeCode?: boolean;
}

export class SapakTreatment {
  treatCode: string;
  treatDesc: string;
}

export class SapakDataRequest {
  userName: string;
  kodSapak: string;
  invoice: Invoice;
  invoiceRow: InvoiceRow;
  invoiceTreatNum: string;
  // constructor(userName: string, kodSapak: string) {
  //   this.userName = userName;
  //   this.kodSapak = kodSapak;
  // }
}

export class SapakTreatmentsListResponse {
  results: any[];
}
