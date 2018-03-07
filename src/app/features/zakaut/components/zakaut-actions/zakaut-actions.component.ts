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
import * as fromUserStore from '@userStore';
import * as fromZakautStore from '@zakautStore';
import { Sapak } from 'app/features/user/models/sapak.model';
import { Zakaut } from 'app/features/user/models/permission.model';
import {
  ZakautQueryModel,
  ZakautNoCardReason
} from 'app/features/zakaut/models/zakaut-query.model';

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
    manualCardNumberLength: 8,
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי',
      pattern: 'ערך לא תקין'
    },
    prefixes: [
      { value: '1', viewValue: 'ת"ז' },
      { value: '9', viewValue: 'דרכון' }
    ],
    reasons: [
      { value: ZakautNoCardReason.BAD_CARD, viewValue: 'כרטיס פגום' },
      {
        value: ZakautNoCardReason.BAD_CARD_READER,
        viewValue: 'קורא כרטיסים פגום'
      }
    ],
    zakautWithCardForm: {
      cardInputRule: '^([0-9]{5}=[0-9]{30})+$'
    },
    zakautWithTempCardForm: {
      idInputRule: '^([0-9]{1,9})$',
      cardInputRule: '^([0-9]{1,4})$'
    },
    zakautManualForm: {
      idInputRule: '^([0-9]{1,9})$',
      cardInputRule: '^([0-9]{1,8})$'
    },
    possibleYears: [...Array.from(Array(1 + 118).keys())]
      .map(v => `${1900 + v}`)
      .reverse()
  };

  //#endregion

  // Global Vars
  matcher = new ZakautErrorStateMatcher();
  isValidating$: Observable<boolean>;
  tabsDisabled = false;
  currentSapak$: Observable<Sapak>;

  selectedValueForPrefixId = '1';

  zakautWithCardForm: FormGroup;
  zakautWithTempCardForm: FormGroup;
  zakautManualForm: FormGroup;

  zakautRequest = new ZakautQueryModel();

  constructor(
    private fb: FormBuilder,
    private userStore: Store<fromUserStore.UserState>,
    private zakautStore: Store<fromZakautStore.ZakautState>
  ) {
    this.currentSapak$ = this.userStore.select(
      fromUserStore.activeSapakSelector
    );
    this.isValidating$ = this.zakautStore.select(
      fromZakautStore.zakautLoadingSelector
    );
  }

  ngOnInit() {
    this.createForms();
    this.currentSapak$.subscribe(sapak => {
      this.zakautRequest.sapakCode = sapak.kodSapak;
      if (sapak.kodSapak !== '') {
        if (
          sapak.permissions['zakaut'].permissionType === Zakaut.With_Card_Only
        ) {
          this.tabsDisabled = true;
        } else {
          this.tabsDisabled = false;
        }
      }
    });
    this.isValidating$.subscribe(val => {
      if (val) {
        this.disableAllForms();
      } else {
        this.enableAllForms();
      }
    });
  }
  //#region Actions on all Forms
  createForms() {
    this.createFormZakautWithCard();
    this.createFormZakautWithTempCard();
    this.createFormManual();
  }

  disableAllForms() {
    this.disableWithCardForm();
    this.disableTempForm();
    this.disableManualForm();
  }

  enableAllForms() {
    this.enableForm();
    this.enableManualForm();
    this.enableTempForm();
  }
  //#endregion

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

  //#region ZakautManual
  createFormManual() {
    this.zakautManualForm = this.fb.group({
      _zakautManualIdPrefixControl: new FormControl(
        { value: '1', disabled: true },
        [Validators.required]
      ),
      _zakautManualIdControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern(this.vars.zakautManualForm.idInputRule)
      ]),
      _zakautManualDOBControl: new FormControl({ value: '', disabled: true }, [
        Validators.required
      ]),
      _zakautManualCardNumberControl: new FormControl(
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.vars.zakautManualForm.cardInputRule)
        ]
      ),
      _zakautManualReasonControl: new FormControl(
        { value: '', disabled: true },
        [Validators.required]
      )
    });
    this.enableManualForm();
  }

  enableManualForm() {
    this.zakautManualForm.get('_zakautManualIdPrefixControl').enable();
    this.zakautManualForm.get('_zakautManualIdControl').enable();
    this.zakautManualForm.get('_zakautManualDOBControl').enable();
    this.zakautManualForm.get('_zakautManualCardNumberControl').enable();
    this.zakautManualForm.get('_zakautManualReasonControl').enable();
  }

  disableManualForm() {
    this.zakautManualForm.disable();
    this.zakautManualForm.get('_zakautManualIdPrefixControl').disable();
    this.zakautManualForm.get('_zakautManualIdControl').disable();
    this.zakautManualForm.get('_zakautManualDOBControl').disable();
    this.zakautManualForm.get('_zakautManualCardNumberControl').disable();
    this.zakautManualForm.get('_zakautManualReasonControl').disable();
  }
  //#endregion

  validateCard(form: FormGroup) {
    // this.disableAllForms();
    this.zakautRequest = this.buildRequest(form);
    this.zakautStore.dispatch(
      new fromZakautStore.CheckZakaut(this.zakautRequest)
    );
  }

  // TODO: Make Generic
  buildRequest(form: FormGroup): ZakautQueryModel {
    this.clearRequest();
    switch (form) {
      case this.zakautWithCardForm: {
        this.zakautRequest.requestType = '01';
        this.zakautRequest.cardNumber = form.get(
          '_zakautWithCardControl'
        ).value;
        break;
      }
      case this.zakautWithTempCardForm: {
        this.zakautRequest.requestType = '02';
        this.zakautRequest.id = form.get('_zakautWithTempCardIdControl').value;
        this.zakautRequest.idPrefix = form.get(
          '_zakautWithTempCardIdPrefixControl'
        ).value;
        this.zakautRequest.dateOfBirth = form.get(
          '_zakautWithTempCardDOBControl'
        ).value;
        this.zakautRequest.cardNumber = form.get(
          '_zakautWithTempCardNumberControl'
        ).value;
        break;
      }
      case this.zakautManualForm: {
        this.zakautRequest.requestType = '03';
        this.zakautRequest.id = form.get('_zakautManualIdControl').value;
        this.zakautRequest.idPrefix = form.get(
          '_zakautManualIdPrefixControl'
        ).value;
        this.zakautRequest.dateOfBirth = form.get(
          '_zakautManualDOBControl'
        ).value;

        this.zakautRequest.cardNumber = form.get(
          '_zakautManualCardNumberControl'
        ).value;
        this.zakautRequest.noCardReason = form.get(
          '_zakautManualReasonControl'
        ).value;
        break;
      }
    }
    return this.zakautRequest;
  }

  clearRequest() {
    this.zakautRequest.requestType = null;
    this.zakautRequest.cardNumber = null;
    this.zakautRequest.id = null;
    this.zakautRequest.idPrefix = null;
    this.zakautRequest.dateOfBirth = null;
    this.zakautRequest.noCardReason = null;
  }
}
