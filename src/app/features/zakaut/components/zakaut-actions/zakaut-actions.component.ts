import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
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
import { ZakautQueryModel } from 'app/features/zakaut/models/zakaut-query.model';

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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZakautActionsComponent implements OnInit {
  //#region options and errors for all the Forms
  vars = {
    hideRequired: true,
    floatLabel: 'never',
    BtnName: 'בדוק זכאות',
    BtnValidating: 'בודק זכאות, אנא המתן...',
    idLength: 9,
    tempCardNumberLength: 4,
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי',
      pattern: 'ערך לא תקין'
    },
    prefixes: [
      { value: '1', viewValue: 'ת"ז' },
      { value: '9', viewValue: 'דרכון' }
    ],
    zakautWithCardForm: {
      cardInputRule: '^([0-9]{5}=[0-9]{30})+$'
    },
    zakautWithTempCardForm: {
      idInputRule: '^([0-9]{1,9})$',
      cardInputRule: '^([0-9]{1,4})$'
    },
    possibleYears: [...Array.from(Array(1 + 118).keys())]
      .map(v => `${1900 + v}`)
      .reverse()
  };

  //#endregion

  // Global Vars
  matcher = new ZakautErrorStateMatcher();
  isValidating = false;
  tabsDisabled = false;
  currentSapak$: Observable<Sapak>;

  selectedValueForPrefixId = '1';

  zakautWithCardForm: FormGroup;
  zakautWithTempCardForm: FormGroup;
  zakautManualForm: FormGroup;

  zakautRequest = new ZakautQueryModel();

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
    // this.selectedValueForPrefixId = this.vars.prefixes[0].value;
    // console.log(this.selectedValueForPrefixId);
  }

  createForms() {
    this.createFormZakautWithCard();
    this.createFormZakautWithTempCard();
  }

  disableAllForms() {
    this.disableWithCardForm();
    this.disableTempForm();
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

  disableWithCardForm() {
    this.zakautWithCardForm.disable();
    this.zakautWithCardForm.get('_zakautWithCardControl').disable();
  }
  //#endregion

  //#region ZakautWithTempCard
  createFormZakautWithTempCard() {
    this.zakautWithTempCardForm = this.fb.group({
      _zakautWithTempCardIdPrefixControl: new FormControl(
        { value: '1', disabled: true },
        [Validators.required]
      ),
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
    this.zakautWithTempCardForm
      .get('_zakautWithTempCardIdPrefixControl')
      .enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdControl').enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardDOBControl').enable();
    this.zakautWithTempCardForm
      .get('_zakautWithTempCardNumberControl')
      .enable();
  }

  disableTempForm() {
    this.zakautWithTempCardForm.disable();
    this.zakautWithTempCardForm
      .get('_zakautWithTempCardIdPrefixControl')
      .disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdControl').disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardDOBControl').disable();
    this.zakautWithTempCardForm
      .get('_zakautWithTempCardNumberControl')
      .disable();
  }
  //#endregion

  validateCard(form: FormGroup) {
    this.isValidating = true;
    this.disableAllForms();
    this.zakautRequest = this.buildRequest(form);
    console.log(this.zakautRequest);
  }

  buildRequest(form: FormGroup): ZakautQueryModel {
    switch (form) {
      case this.zakautWithCardForm: {
        this.zakautRequest.cardNumber = form.get(
          '_zakautWithCardControl'
        ).value;
        this.zakautRequest.requestType = '1';
        break;
      }
      case this.zakautWithTempCardForm: {
        this.zakautRequest.dateOfBirth = form.get(
          '_zakautWithTempCardDOBControl'
        ).value;
        this.zakautRequest.requestType = '2';
        this.zakautRequest.id = form.get('_zakautWithTempCardIdControl').value;
        this.zakautRequest.idPrefix = form.get(
          '_zakautWithTempCardIdPrefixControl'
        ).value;
        this.zakautRequest.tempCard = form.get(
          '_zakautWithTempCardNumberControl'
        ).value;
        break;
      }
    }
    return this.zakautRequest;
  }
}
