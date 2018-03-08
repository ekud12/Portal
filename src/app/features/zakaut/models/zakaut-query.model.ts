export class ZakautQueryModel {
  userName: string;
  sapakCode?: string;
  requestType: string;
  idType?: string;
  id?: string;
  dateOfBirth?: string;
  cardNumber?: string;
  noCardReason?: ZakautNoCardReason;
}

export enum ZakautNoCardReason {
  BAD_CARD = '22225',
  BAD_CARD_READER = '22224'
}
