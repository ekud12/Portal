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
import { Store } from '@ngrx/store';
import * as fromStore from '@userStore';
import { Sapak } from 'app/features/user/models/sapak.model';
import { Zakaut } from 'app/features/user/models/permission.model';

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
  //#region options and errors for all the Forms
  vars = {
    hideRequired: true,
    floatLabel: 'never',
    BtnName: 'בדוק זכאות',
    BtnValidating: 'בודק זכאות',
    idLength: 9,
    tempCardNumberLength: 4,
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי',
      pattern: 'ערך לא תקין'
    },
    prefixes: [
      { value: 1, viewValue: 'ת"ז' },
      { value: 9, viewValue: 'דרכון' }
    ],
    zakautWithCardForm: {
      cardInputRule: '^([0-9]{5}=[0-9]{30})+$'
    },
    zakautWithTempCardForm: {
      idInputRule: '^([0-9]{1,9})$',
      // dobInputRule: '^([0-9]{4,4})$',
      cardInputRule: '^([0-9]{1,4})$'
    },
    possibleYears: [...Array.from(Array(1 + 118).keys())]
      .map(v => 1900 + v)
      .reverse()
  };

  //#endregion

  // Global Vars
  matcher = new ZakautErrorStateMatcher();
  isValidating = false;
  isValid = false;
  tabsDisabled = false;
  currentSapak$: Observable<Sapak>;

  selectedValueForPrefixId = 1;
  zakautWithCardForm: FormGroup;
  zakautWithTempCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.UserState>
  ) {
    this.currentSapak$ = this.store.select(fromStore.activeSapakSelector);
  }

  ngOnInit() {
    this.createForms();
    this.currentSapak$.subscribe(sapak => {
      if (
        sapak.permissions['zakaut'].permissionType === Zakaut.With_Card_Only
      ) {
        this.tabsDisabled = true;
      } else {
        this.tabsDisabled = false;
      }
    });
    this.selectedValueForPrefixId = this.vars.prefixes[0].value;
  }
  createForms() {
    this.createFormZakautWithCard();
    this.createFormZakautWithTempCard();
  }

  //#region ZakautWithCard
  createFormZakautWithCard() {
    this.zakautWithCardForm = this.fb.group({
      _zakautWithCardControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.vars.zakautWithCardForm.cardInputRule)
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

  //#region ZakautWithTempCard
  createFormZakautWithTempCard() {
    this.zakautWithTempCardForm = this.fb.group({
      _zakautWithTempCardIdControl: new FormControl(
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern(this.vars.zakautWithTempCardForm.idInputRule)
        ]
      ),
      _zakautWithTempCardDOBControl: new FormControl(
        { value: '', disabled: true },
        [Validators.required]
      ),
      _zakautWithTempCardNumberControl: new FormControl(
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.vars.zakautWithTempCardForm.cardInputRule)
        ]
      )
    });
    this.enableTempForm();
  }

  enableTempForm() {
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdControl').enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardDOBControl').enable();
    this.zakautWithTempCardForm
      .get('_zakautWithTempCardNumberControl')
      .enable();
  }

  disableTempForm() {
    this.zakautWithTempCardForm.disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdControl').disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardDOBControl').disable();
    this.zakautWithTempCardForm
      .get('_zakautWithTempCardNumberControl')
      .disable();
  }
  //#endregion

  validateCard() {
    this.isValidating = true;
    this.disableForm();
  }
}
