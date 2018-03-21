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
