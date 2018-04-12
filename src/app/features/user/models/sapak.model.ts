import { Permission } from './permission.model';

export class Sapak {
  kodSapak: string;
  description?: string;
  permissions?: { [key: string]: Permission };
  treatments?: SapakTreatment[];
}

export class SapakTreatment {
  treatCode: string;
  treatDesc: string;
}

export class SapakDataRequest {
  userName: string;
  kodSapak: string;
  invoiceNum: string;
  invoiceRowNum: string;
  invoiceTreatNum: string;
  constructor(userName: string, kodSapak: string) {
    this.userName = userName;
    this.kodSapak = kodSapak;
  }
}

export class SapakTreatmentsListResponse {
  results: any[];
}
