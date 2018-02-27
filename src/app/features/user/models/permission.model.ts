export class Permission {
  permissionType: Zakaut | Invoice;
  desc: string;
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
