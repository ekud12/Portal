export class Permission {
  permissionType: Zakaut | Invoice;
  desc?: string | ZakautDesc | InvoiceDesc;
}

// Permission Type Enums
export enum Zakaut {
  With_Card_Only = 0,
  With_Card_And_Manual_Not_Surgeon = 1,
  With_Card_And_Manual_Surgeon = 2
}

export enum Invoice {
  With_Card_Only = 0,
  With_Card_And_Manual_Not_Surgeon = 1,
  With_Card_And_Manual_Surgeon = 2
}

export enum ZakautDesc {
  'יכול לבדוק זכאות ללא בחירת טיפול' = 0,
  'חייב לבחור טיפול לבדיקת זכאות' = 1,
  'חייב לבחור טיפול לבדיקת זכאות, ללא חובת הזנת כרטיס' = 2
}

export enum InvoiceDesc {
  'ערך עתידי' = 3
}
