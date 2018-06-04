import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast-service.service';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoicesService } from '../../invoices.service';
import {
  ObligationsByCustomerIdAndCommitmentRequest,
  ObligationsByCustomerIdRequest
} from '../../models/requests-models/requests';
import * as userActions from '../actions';

@Injectable()
export class MiscEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService, private toaster: ToastService) {}

  @Effect()
  getCardSwipes$ = this.actions$.ofType(userActions.GET_CARD_SWIPES).pipe(
    map((action: userActions.GetCardSwipes) => action.payload),
    switchMap((request: SapakDataRequest) => {
      return this.invoicesService
        .getMagneticCardReportsForSapak(request)
        .pipe(
          switchMap(res => [new userActions.GetCardSwipesSuccess(res)]),
          catchError(error => of(new userActions.GetCardSwipesFail(error)))
        );
    })
  );

  @Effect()
  getObligationsByCustomerId$ = this.actions$.ofType(userActions.GET_OBLIGATIONS_BY_CUSTOMER_ID).pipe(
    map((action: userActions.GetObligationsByCustomerId) => action.payload),
    switchMap((request: ObligationsByCustomerIdRequest) => {
      return this.invoicesService
        .getObligationsByCustomerId(request)
        .pipe(
          switchMap(res => [new userActions.GetObligationsByCustomerIdSuccess(res)]),
          catchError(error => of(new userActions.GetObligationsByCustomerIdFail(error)))
        );
    })
  );

  @Effect()
  getObligationsByCustomerIdAndCommitment$ = this.actions$.ofType(userActions.GET_OBLIGATIONS_BY_CUSTOMER_ID_AND_COMMITMENT).pipe(
    map((action: userActions.GetObligationsByCustomerIdAndCommitment) => action.payload),
    switchMap((request: ObligationsByCustomerIdAndCommitmentRequest) => {
      return this.invoicesService
        .getObligationsByCustomerIdAndCommitment(request)
        .pipe(
          switchMap(res => [new userActions.GetObligationsByCustomerIdAndCommitmentSuccess(res)]),
          catchError(error => of(new userActions.GetObligationsByCustomerIdAndCommitmentFail(error)))
        );
    })
  );
}
