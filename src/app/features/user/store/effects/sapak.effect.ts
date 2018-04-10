import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { UserService } from 'app/features/user/user.service';
import { SapakDataRequest, Sapak } from '../../models/sapak.model';
import { MatSnackBar } from '@angular/material';
import { ToastService } from 'app/core/services/toast-service.service';
import * as userStore from '@userStore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SapakEffects {
  activeSapak$: Observable<Sapak>;

  constructor(private actions$: Actions, private userService: UserService, private toaster: ToastService) {
    // this.activeSapak$ = userStore.select(userStore.activeSapakSelector);
  }

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

  @Effect({ dispatch: false })
  changeSapakFinished$ = this.actions$
    .ofType(userActions.CHANGE_SAPAK_SUCCESS)
    .pipe(
      map((action: userActions.ChangeSapakSuccess) => action.data),
      tap(val => this.toaster.openSnackBar(`ספק פעיל שונה ל : ${val.kodSapak}.`, null))
    );

  @Effect({ dispatch: false })
  changeSapakFailed$ = this.actions$
    .ofType(userActions.CHANGE_SAPAK_FAILURE)
    .pipe(tap(() => this.toaster.openSnackBar(`תקלה בהחלפת ספק!`, null)));
}
