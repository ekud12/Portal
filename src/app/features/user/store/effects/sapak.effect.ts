import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from 'app/features/user/user.service';
import { SapakTreatmentsRequest, Sapak } from '../../models/sapak.model';
import { MatSnackBar } from '@angular/material';
import { ToastService } from 'app/core/services/toast-service.service';
import * as userStore from '@userStore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SapakEffects {
  activeSapak$: Observable<Sapak>;

  constructor(
    private actions$: Actions,
    private spinnerService: Ng4LoadingSpinnerService,
    private userService: UserService,
    private toaster: ToastService
  ) {
    // this.activeSapak$ = userStore.select(userStore.activeSapakSelector);
  }

  @Effect()
  changeSapak$ = this.actions$.ofType(userActions.CHANGE_SAPAK, userActions.CHANGE_SAPAK_DEFAULT).pipe(
    map((action: userActions.ChangeSapak | userActions.ChangeSapakDefault) => action.payload),
    switchMap((getTreatModel: SapakTreatmentsRequest) => {
      return this.userService
        .getTreatmentsForSapak(getTreatModel)
        .pipe(
          map(data => data.data[0]),
          switchMap(newTreatList => [new userActions.ChangeSapakSuccess(newTreatList, getTreatModel.kodSapak)]),
          catchError(error => of(new userActions.ChangeSapakFail(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  changeSapakFinished$ = this.actions$
    .ofType(userActions.CHANGE_SAPAK_SUCCESS)

    .pipe(
      map((action: userActions.ChangeSapakSuccess) => action.newSapak),
      tap(val => this.toaster.openSnackBar(`קוד ספק פעיל שונה ל : ${val}.`, null))
    );

  @Effect({ dispatch: false })
  changeSapakFailed$ = this.actions$
    .ofType(userActions.CHANGE_SAPAK_FAILURE)
    .pipe(tap(() => this.toaster.openSnackBar(`תקלה בהחלפת ספק!`, null)));
}
