import { Action } from '@ngrx/store';
import { LoginModel } from '../../models/login.model';

export const LOGIN_USER = '[User] Login';
export const LOGIN_USER_FAILURE = '[User] Login Fail';
export const LOGIN_USER_SUCCESS = '[User] Login Success';
export const LOGIN_USER_COMPLETED = '[User] Login Completed';

// User Actions
export class UserLogin implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: LoginModel) {}
}

export class UserLoginFail implements Action {
  readonly type = LOGIN_USER_FAILURE;
  constructor(public payload: string) {}
}

export class UserLoginSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: any) {
    console.log(payload);
  }
}
export class UserLoginCompleted implements Action {
  readonly type = LOGIN_USER_COMPLETED;
  constructor(public payload: string) {}
}

export type userActions =
  | UserLogin
  | UserLoginCompleted
  | UserLoginFail
  | UserLoginSuccess;
