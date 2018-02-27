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
import { LoginFormDetails } from '../models/login.model';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateY(10%)', opacity: 0 }),
        animate(600)
      ]),
      transition(':leave', [
        style({ transform: 'translateY(10%)', opacity: 0 }),
        animate(600)
      ])
    ]),
    trigger('itemFade', [
      transition(':enter', [style({ opacity: 0 }), animate(500)]),
      transition(':leave', [style({ opacity: 0 }), animate(500)])
    ])
  ]
})
export class LoginComponent implements OnInit {
  matcher = new LoginErrorStateMatcher();
  options = {
    hideRequired: false,
    floatLabel: 'never',
    loginButtonName: 'כניסה',
    loginButtonValidating: 'מאמת...',
    loginButtonLink: 'dash',
    passwordRules: '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$',
    usernameRules: '^(?=.*[A-Za-z])(?=.*[0-9]).*$',
    success_msg: 'התחברות הצליחה! הנך מועבר...',
    support_phone: 'תמיכה: 5443*'
  };

  forms = [
    {
      icon: 'person',
      name: 'שם משתמש',
      type: 'text',
      controller: '_usernameControl'
    },
    {
      icon: 'lock',
      name: 'סיסמא',
      type: 'password',
      controller: '_passwordControl'
    }
  ];

  errors = {
    required: '.אנא הכנס נתונים חסרים',
    minlength: 'נתון קצר מדי.',
    pattern: 'ערך לא חוקי.'
  };

  isValidating = false;
  isValid = false;
  loginForm: FormGroup;
  LoginDetails = new LoginFormDetails();

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
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
    this.isValidating = true;
    this.disableForm();

    // Model for login service
    this.LoginDetails.username = this.loginForm.get('_usernameControl').value;
    this.LoginDetails.password = this.loginForm.get('_passwordControl').value;
    this.LoginDetails.isValidating = this.isValidating;

    setTimeout(() => {
      this.isValidating = false;
      this.isValid = true;
    }, 3000);
    setTimeout(() => this.router.navigate(['portal']), 5000);
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
