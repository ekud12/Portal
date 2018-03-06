export class ZakautQueryModel {
  requestType: string;
  cardNumber?: string;
  tempCard?: string;
  id?: string;
  idPrefix?: string;
  dateOfBirth?: string;
  noCardReason?: ZakautNoCardReason;
}

export enum ZakautNoCardReason {
  BAD_CARD = 0,
  BAD_CARD_READER = 1
}
