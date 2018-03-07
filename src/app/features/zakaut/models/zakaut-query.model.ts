export class ZakautQueryModel {
  requestType: string;
  cardNumber?: string;
  tempCard?: string;
  id?: string;
  idPrefix?: string;
  dateOfBirth?: string;
  noCardReason?: ZakautNoCardReason;
  sapakCode?: string;
}

export enum ZakautNoCardReason {
  BAD_CARD = 22225,
  BAD_CARD_READER = 22224
}
