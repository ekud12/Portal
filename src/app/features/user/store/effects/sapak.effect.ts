import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from 'app/features/user/user.service';
import { SapakTreatmentsRequest } from '../../models/sapak.model';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SapakEffects {
  constructor(private actions$: Actions, private spinnerService: Ng4LoadingSpinnerService, private userService: UserService) {}

  @Effect()
  changeSapak$ = this.actions$.ofType(userActions.CHANGE_SAPAK, userActions.CHANGE_SAPAK_DEFAULT).pipe(
    map((action: userActions.ChangeSapak) => action.payload),
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
}
