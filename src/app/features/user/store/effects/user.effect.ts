import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import * as invoicesStore from '@invoicesStore';
import { Actions, Effect } from '@ngrx/effects';
import * as zakautStore from '@zakautStore';
import { AuthenticationService } from 'app/core/services/auth.service';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../../../core/store';
import { LoginModel } from '../../models/login.model';
import { UserService } from '../../user.service';
import * as userActions from '../actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService, private authService: AuthenticationService) {}

  @Effect()
  loginUser$ = this.actions$.ofType(userActions.LOGIN_USER).pipe(
    map((action: userActions.UserLogin) => action.payload),
    switchMap((loginDetails: LoginModel) => {
      /**  ADD AUTH LOGIC HERE */
      return this.userService
        .login(loginDetails)
        .pipe(
          switchMap(res => [new userActions.UserLoginSuccess(res), new userActions.UserLoginCompleted('redirect')]),
          catchError(error => of(new userActions.UserLoginFail(error)))
        );
    })
  );

  @Effect()
  loginUserSuccess$ = this.actions$
    .ofType(userActions.LOGIN_USER_COMPLETED)
    .pipe(mergeMap(val => [new fromRoot.Go({ path: ['/portal/invoices'] }), new userActions.ChangeSapakDefault(null)]));

  @Effect()
  logoutUser$ = this.actions$
    .ofType(userActions.LOGOUT_USER)
    .pipe(
      switchMap(val => [
        new zakautStore.ResetZakaut(),
        new invoicesStore.ResetInvoices(),
        new invoicesStore.ResetInvoiceRows(),
        new invoicesStore.ResetMisc(),
        new userActions.UserLogoutCompleted()
      ]),
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
