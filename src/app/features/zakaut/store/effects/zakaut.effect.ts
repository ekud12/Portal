import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';
import { ZakautQueryModel } from '../../models/zakaut-query.model';
import { ZakautService } from '../../zakaut.service';

@Injectable()
export class ZakautEffects {
  constructor(private actions$: Actions, private zakautService: ZakautService) {}

  @Effect()
  checkZakaut$ = this.actions$.ofType(userActions.CHECK_ZAKAUT).pipe(
    map((action: userActions.CheckZakaut) => action.payload),
    switchMap((zakautRequest: ZakautQueryModel) => {
      return this.zakautService
        .checkZakaut(zakautRequest)
        .pipe(
          switchMap(res => [new userActions.CheckZakautSuccess(res.data)]),
          catchError(error => of(new userActions.CheckZakautFail(error)))
        );
    })
  );

  @Effect()
  checkZakautCompleted$ = this.actions$
    /** ADD check on result set size, and redirect to invoice action accordingly, check module src as well - only for invoices*/
    .ofType(userActions.CHECK_ZAKAUT_SUCCESS, userActions.CHECK_ZAKAUT_FAIL)
    .pipe(map(() => new userActions.CheckZakautCompleted()));
}
