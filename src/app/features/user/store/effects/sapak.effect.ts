import { Injectable } from '@angular/core';
import * as invoiceStore from '@invoicesStore';
import { Actions, Effect } from '@ngrx/effects';
import { ToastService } from 'app/core/services/toast-service.service';
import { UserService } from 'app/features/user/user.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Sapak, SapakDataRequest } from '../../models/sapak.model';
import * as userActions from '../actions';

@Injectable()
export class SapakEffects {
  activeSapak$: Observable<Sapak>;

  constructor(private actions$: Actions, private userService: UserService, private toaster: ToastService) {}

  @Effect()
  changeSapak$ = this.actions$.ofType(userActions.CHANGE_SAPAK, userActions.CHANGE_SAPAK_DEFAULT).pipe(
    map((action: userActions.ChangeSapak | userActions.ChangeSapakDefault) => action.payload),
    switchMap((dataModel: SapakDataRequest) => {
      return this.userService
        .getTreatmentsForSapak(dataModel)
        .pipe(
          map(data => data.data[0]),
          switchMap(newTreatList => [new userActions.ChangeSapakSuccess(newTreatList, dataModel)]),
          catchError(error => of(new userActions.ChangeSapakSuccess([], dataModel)))
        );
    })
  );

  @Effect()
  changeSapakSuccess$ = this.actions$.ofType(userActions.CHANGE_SAPAK_SUCCESS).pipe(
    map((action: userActions.ChangeSapakSuccess) => action.data),
    tap(val => {
      this.toaster.openSnackBar(`ספק פעיל שונה ל : ${val.kodSapak}.`, null);
      return val;
    }),
    switchMap(dataModel => [new invoiceStore.GetInvoices(dataModel), new userActions.ChangeSapakCompleted()])
  );

  @Effect({ dispatch: false })
  changeSapakFailed$ = this.actions$
    .ofType(userActions.CHANGE_SAPAK_FAILURE)
    .pipe(tap(() => this.toaster.openSnackBar(`תקלה בהחלפת ספק!`, null)));
}
