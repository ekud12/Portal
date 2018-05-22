import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';
import { InvoicesService } from '../../invoices.service';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { ToastService } from '../../../../core/services/toast-service.service';

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
}
