import { Component, OnInit, ViewChild } from '@angular/core';
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
export class ZakautErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-zakaut-actions',
  templateUrl: './zakaut-actions.component.html',
  styleUrls: ['./zakaut-actions.component.css']
})
export class ZakautActionsComponent implements OnInit {
  matcher = new ZakautErrorStateMatcher();
  options = {
    zakautWithCardForm: {
      hideRequired: true,
      floatLabel: 'never',
      zakautWithCardBtnName: 'בדוק זכאות',
      zakautWithCardBtnValidating: 'בודק זכאות',
      zakautWithCardBtnLink: 'dash',
      cardInputRule: '^([0-9]{5}=[0-9]{30})+$'
    }
  };
  errors = {
    required: '.אנא הכנס נתונים חסרים',
    minlength: 'נתון קצר מדי.',
    pattern: 'קוד כרטיס לא תקין, אנא העבר שוב'
  };
  isValidating = false;
  isValid = false;

  zakautWithCardForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createFormZakautWithCard();
  }

  createFormZakautWithCard() {
    this.zakautWithCardForm = this.fb.group({
      _zakautWithCardControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.options.zakautWithCardForm.cardInputRule)
      ])
    });
    this.enableForm();
  }

  enableForm() {
    this.zakautWithCardForm.get('_zakautWithCardControl').enable();
  }

  disableForm() {
    this.zakautWithCardForm.disable();
    this.zakautWithCardForm.get('_zakautWithCardControl').disable();
  }

  ngOnInit() {}

  validateCard() {
    this.isValidating = true;
    this.disableForm();

    // Model for login service
    // this.LoginDetails.username = this.loginForm.get('_usernameControl').value;
    // this.LoginDetails.password = this.loginForm.get('_passwordControl').value;
    // this.LoginDetails.isValidating = this.isValidating;

    setTimeout(() => {
      this.isValidating = false;
      this.isValid = true;
    }, 3000);
    // setTimeout(() => this.router.navigate(['portal/zakaut']), 5000);
  }
}
