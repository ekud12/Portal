export class ZakautQueryModel {
  isManual: boolean;
  cardNumber?: number;
  id?: number;
  idPrefix?: number;
  dateOfBirth?: number;
  noCardReason?: ZakautNoCardReason;
}

export enum ZakautNoCardReason {
  BAD_CARD = 0,
  BAD_CARD_READER = 1
}
