import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  updateUsername$ = this.actions$
    .ofType(userActions.UPDATE_NAME)
    .pipe(map(() => new userActions.UpdateNameSuccess('liel')));
}
