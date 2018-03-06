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
import { Observable } from 'rxjs/Observable';
import { UserState } from '@user/store/*';
import { Store } from '@ngrx/store';
import * as fromStore from '@userStore';
import { Sapak } from 'app/features/user/models/sapak.model';
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
  //#region ZakautWithCard vars
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
  //#endregion ZakautWithCard vars

  // Global Vars
  matcher = new ZakautErrorStateMatcher();
  isValidating = false;
  isValid = false;

  currentSapak$: Observable<Sapak>;
  zakautWithCardForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<UserState>) {
    this.currentSapak$ = this.store.select(fromStore.activeSapakSelector);
    this.createFormZakautWithCard();
  }
  ngOnInit() {}

  //#region ZakautWithCard
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
  //#endregion

  //#region ZakautByManulCard
  // createFormZakautWithCard() {
  //   this.zakautWithCardForm = this.fb.group({
  //     _zakautWithCardControl: new FormControl({ value: '', disabled: true }, [
  //       Validators.required,
  //       Validators.minLength(6),
  //       Validators.pattern(this.options.zakautWithCardForm.cardInputRule)
  //     ])
  //   });
  //   this.enableForm();
  // }

  // enableForm() {
  //   this.zakautWithCardForm.get('_zakautWithCardControl').enable();
  // }

  // disableForm() {
  //   this.zakautWithCardForm.disable();
  //   this.zakautWithCardForm.get('_zakautWithCardControl').disable();
  // }
  //#endregion

  validateCard() {
    this.isValidating = true;
    this.disableForm();
  }
}
