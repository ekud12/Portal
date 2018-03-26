import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import * as zakautStore from '@zakautStore';
import * as userStore from '@userStore';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/take';
import { switchMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { UserService } from '../../user.service';
import { LoginModel } from '../../models/login.model';
import * as fromRoot from '../../../../core/store';
import { SapakTreatmentsRequest } from 'app/features/user/models/sapak.model';
import { UserState } from '@userStore';
import { Store } from '@ngrx/store';
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loginUser$ = this.actions$.ofType(userActions.LOGIN_USER).pipe(
    map((action: userActions.UserLogin) => action.payload),
    switchMap((loginDetails: LoginModel) => {
      return this.userService
        .login(loginDetails)
        .pipe(
          switchMap(res => [
            new userActions.UserLoginSuccess(res),
            new userActions.ChangeSapakDefault(null),
            new userActions.UserLoginCompleted('redirect')
          ]),
          catchError(error => of(new userActions.UserLoginFail(error)))
        );
    })
  );

  @Effect()
  loginUserSuccess$ = this.actions$.ofType(userActions.LOGIN_USER_COMPLETED).pipe(
    map(() => {
      return new fromRoot.Go({
        path: ['/portal/grid']
      });
    })
  );

  @Effect()
  logoutUser$ = this.actions$
    .ofType(userActions.LOGOUT_USER)
    .pipe(
      switchMap(val => [new zakautStore.ResetZakaut(), new userActions.UserLogoutCompleted()]),
      catchError(error => of(new userActions.UserLoginFail(error)))
    );

  @Effect()
  logoutUserRedirect$ = this.actions$.ofType(userActions.LOGOUT_USER_COMPLETED).pipe(
    map(() => {
      return new fromRoot.Go({
        path: ['/login']
      });
    })
  );
}
