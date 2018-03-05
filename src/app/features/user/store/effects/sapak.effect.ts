import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class SapakEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  changeSapak$ = this.actions$
    .ofType(userActions.CHANGE_SAPAK)
    .pipe(
      map((action: userActions.ChangeSapak) => action.payload),
      map(kodSapak => new userActions.ChangeSapakSuccess(kodSapak))
    );
}
