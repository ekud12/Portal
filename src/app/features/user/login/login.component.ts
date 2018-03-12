import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import {
  trigger,
  state,
  animate,
  transition,
  style,
  group
} from '@angular/animations';

import { ErrorStateMatcher } from '@angular/material/core';
import { LoginModel } from '../models/login.model';
import * as localConfigVars from './login.const';
import { Store } from '@ngrx/store';
import { UserState } from '../store';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import * as fromUserStore from '../store';
import { moveAnimation } from '../../../core/animations';
export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    if (control.value === '') {
      return false;
    } else {
      return !!(
        control &&
        control.invalid &&
        (control.dirty || control.touched || isSubmitted)
      );
    }
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveAnimation]
})
export class LoginComponent implements OnInit {
  matcher = new LoginErrorStateMatcher();
  user$: Observable<User>;
  loginErrors$: Observable<string[]>;
  isValidating$: Observable<boolean>;

  options = localConfigVars.options;
  forms = localConfigVars.forms;
  errors = localConfigVars.errors;

  isValid = false;
  loginForm: FormGroup;
  LoginDetails = new LoginModel();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<UserState>
  ) {
    this.user$ = store.select(fromUserStore.userSelector);
    this.loginErrors$ = store.select(fromUserStore.userErrorsSelector);
    this.isValidating$ = store.select(fromUserStore.userLoadingSelector);
    this.createForm();
    this.loginErrors$.subscribe(val => {
      if (Array.isArray(val) && val.length) {
        this.enableForm();
      }
    });
  }

  ngOnInit() {}

  createForm() {
    this.loginForm = this.fb.group({
      _usernameControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.options.usernameRules)
      ]),
      _passwordControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.options.usernameRules)
      ])
    });
    this.enableForm();
  }

  submitLoginForm() {
    this.disableForm();

    // Model for login service
    this.LoginDetails.username = this.loginForm.get('_usernameControl').value;
    this.LoginDetails.password = this.loginForm.get('_passwordControl').value;

    this.store.dispatch(new fromUserStore.UserLogin(this.LoginDetails));
  }

  autoLogin() {
    this.loginForm.get('_usernameControl').setValue('testimm');
    this.loginForm.get('_passwordControl').setValue('testimm3');
    this.submitLoginForm();
  }

  enableForm() {
    this.loginForm.get('_usernameControl').enable();
    this.loginForm.get('_passwordControl').enable();
  }

  disableForm() {
    this.loginForm.disable();
    this.loginForm.get('_usernameControl').disable();
    this.loginForm.get('_passwordControl').disable();
  }
}
