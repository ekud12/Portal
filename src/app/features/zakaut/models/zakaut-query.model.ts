export class ZakautQueryModel {
  userName: string;
  sapakCode?: string;
  requestType: string;
  idType?: string;
  id?: string;
  dateOfBirth?: string;
  cardNumber?: string;
  noCardReason?: ZakautNoCardReason;
  isSurgeon?: boolean;
  treatmentCode?: string;
}

export class ZakautResponseModel {
  messages: string[];
  extraData: {};
}

export enum ZakautNoCardReason {
  BAD_CARD = '1',
  BAD_CARD_READER = '2'
}
