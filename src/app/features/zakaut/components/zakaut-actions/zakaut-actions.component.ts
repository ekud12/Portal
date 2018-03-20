import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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
import { trigger, state, animate, transition, style, group } from '@angular/animations';

import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import * as fromZakautStore from '@zakautStore';
import { Sapak } from 'app/features/user/models/sapak.model';
import { Zakaut } from 'app/features/user/models/permission.model';
import { ZakautQueryModel, ZakautNoCardReason } from 'app/features/zakaut/models/zakaut-query.model';
import { timer } from 'rxjs/observable/timer';
import { take, map, switchMap, tap } from 'rxjs/operators';

/**
 * Zakaut Error State Matcher
 * This creates a class for Checking if form control is
 * valid for showing various errors
 */
export class ZakautErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if (!control.value) {
      return false;
    } else {
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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
  /**
   * Global Vars object for all 3 forms in the component.
   * each form has its own validators values and
   * @argument vars global vars shared with all forms
   * @argument idTypes prefixes for ID Type in forms
   * @argument reasons reasons for radioboxes in Manual form
   * @argument possibleYears year range for forms
   */
  //#region
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
    idTypes: [{ value: '1', viewValue: 'ת"ז' }, { value: '9', viewValue: 'דרכון' }],
    treatments: [{ value: '89.5', viewValue: 'כריתת אונה למתחילים' }, { value: '112.1', viewValue: 'כריתת אונה למתקדמים' }],
    reasons: [
      { value: ZakautNoCardReason.BAD_CARD, viewValue: 'כרטיס פגום' },
      {
        value: ZakautNoCardReason.BAD_CARD_READER,
        viewValue: 'קורא כרטיסים פגום'
      }
    ],
    zakautWithCardForm: {
      cardInputRule: '^B([0-9]{5}=[0-9]{30})$'
    },
    zakautWithTempCardForm: {
      idInputRule: '^([0-9]{1,9})$',
      cardInputRule: '^([0-9]{1,4})$'
    },
    zakautManualForm: {
      idInputRule: '^([0-9]{1,9})$',
      cardInputRule: '^([0-9]{1,8})$'
    },
    possibleYears: [...Array.from(Array(1 + 118).keys())].map(v => `${1900 + v}`).reverse()
  };
  matcher = new ZakautErrorStateMatcher();

  /** Various Store Observables
   *  Global timer
   *  Request for checking Zakaut
   */
  isValidating$: Observable<boolean>;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  zakautResponse$: Observable<string>;
  zakautErrors$: Observable<string[]>;
  zakautRequest = new ZakautQueryModel();
  timerActive = false;
  countDown$;
  count = 15;
  autoCheck = false;
  selectedValueForIdType = '1';
  isSurgeon = false;
  hideCardInput = true;
  hideTreatInput = false;
  //#endregion

  @ViewChild('cardFocusFirstTag') cardInputFocus;

  zakautWithCardForm: FormGroup;
  zakautWithTempCardForm: FormGroup;
  zakautManualForm: FormGroup;

  /**
   * Bind selectors from stores to local vars and create the forms
   * @param {FormBuilder} fb -  Build the form
   * @param {Store<UserState>} userStore - access userStore
   * @param {zakautStore<ZakautState>} zakautStore - access zakautStore
   */
  constructor(
    private fb: FormBuilder,
    private userStore: Store<fromUserStore.UserState>,
    private zakautStore: Store<fromZakautStore.ZakautState>
  ) {
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.isValidating$ = this.zakautStore.select(fromZakautStore.zakautLoadingSelector);
    this.zakautResponse$ = this.zakautStore.select(fromZakautStore.zakautResponseSelector);
    this.zakautErrors$ = this.zakautStore.select(fromZakautStore.zakautErrorsSelector);
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.createForms();
  }

  /**
   * OnInit function that does the following:
   * - Get userName and current sapak and assign to the outgoing request.
   * - Check if we got back response or error from checking zakaut and start timer to reset state.
   * - Lock tabs according to sapak type, and reset forms if changed.
   * - Listen to Changes in card field for automatic activation
   */
  ngOnInit() {
    // store listen
    this.loggedUserName$.subscribe(username => {
      this.zakautRequest.userName = username;
    });
    this.zakautResponse$.subscribe(val => {
      if (val !== null) {
        this.startTimer();
      }
    });
    this.zakautErrors$.subscribe(val => {
      if (val.length > 0) {
        this.startTimer();
      }
    });

    this.currentSapak$.subscribe(sapak => {
      this.resetAllForms();
      this.zakautRequest.sapakCode = sapak.kodSapak;
      if (sapak.kodSapak !== '') {
        switch (sapak.permissions['zakaut'].permissionType) {
          case Zakaut.With_Card_Only: {
            this.zakautRequest.isSurgeon = false;
            this.isSurgeon = false;
            this.hideTreatInput = true;
            this.hideCardInput = false;
            break;
          }
          case Zakaut.With_Card_And_Manual_Not_Surgeon: {
            this.zakautRequest.isSurgeon = false;
            this.isSurgeon = false;
            this.hideTreatInput = false;
            this.hideCardInput = true;
            this.enableIrreleventForSurgeon();
            break;
          }
          case Zakaut.With_Card_And_Manual_Surgeon: {
            this.zakautRequest.isSurgeon = true;
            this.isSurgeon = true;
            this.hideTreatInput = false;
            this.hideCardInput = true;
            this.disableIrreleventForSurgeon();
            break;
          }
        }
      } else {
        this.disableAllForms();
      }
    });
    this.onChanges();
  }

  // fix for multiple calls
  startTimer() {
    this.count = 10;
    this.timerActive = true;
    this.countDown$ = timer(0, 1000)
      .pipe(take(this.count), tap(() => --this.count))
      .subscribe(
        val => {},
        err => {},
        () => {
          (this.count = 10), this.zakautStore.dispatch(new fromZakautStore.ResetZakaut());
          this.zakautWithCardForm.get('_zakautWithCardControl').enable();
          this.zakautWithCardForm.get('_zakautWithCardTreatCodeControl').enable();
          this.timerActive = false;
        }
      );
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

  resetAllForms() {
    this.zakautManualForm.reset();
    this.zakautWithCardForm.reset();
    this.zakautWithTempCardForm.reset();
  }

  disableIrreleventForSurgeon() {
    this.zakautManualForm.get('_zakautManualCardNumberControl').disable();
    this.zakautManualForm.get('_zakautManualReasonControl').disable();
  }

  enableIrreleventForSurgeon() {
    this.zakautManualForm.get('_zakautManualCardNumberControl').enable();
    this.zakautManualForm.get('_zakautManualReasonControl').enable();
  }

  //#endregion

  CheckAutoActivate() {
    console.log(this.zakautWithCardForm.get('_zakautWithCardControl'));
  }

  //#region ZakautWithCard
  createFormZakautWithCard() {
    this.zakautWithCardForm = this.fb.group({
      _zakautWithCardControl: new FormControl({ value: '' }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.vars.zakautWithCardForm.cardInputRule)
      ]),
      _zakautWithCardTreatCodeControl: new FormControl({ value: '' }, [Validators.required])
    });
    // this.enableForm();
  }

  enableForm() {
    this.zakautWithCardForm.get('_zakautWithCardTreatCodeControl').enable();
    this.zakautWithCardForm.get('_zakautWithCardControl').enable();
  }

  disableWithCardForm() {
    this.zakautWithCardForm.get('_zakautWithCardTreatCodeControl').disable();
    this.zakautWithCardForm.get('_zakautWithCardControl').disable();
  }
  //#endregion

  //#region ZakautWithTempCard
  createFormZakautWithTempCard() {
    this.zakautWithTempCardForm = this.fb.group({
      _zakautWithTempCardIdTypeControl: new FormControl({ value: '1', disabled: true }, [Validators.required]),
      _zakautWithTempCardIdControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern(this.vars.zakautWithTempCardForm.idInputRule)
      ]),
      _zakautWithTempCardDOBControl: new FormControl({ value: '', disabled: true }, [Validators.required]),
      _zakautWithTempCardNumberControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.vars.zakautWithTempCardForm.cardInputRule)
      ]),
      _zakautWithTempCardTreatCodeControl: new FormControl({ value: '' }, [Validators.required])
    });
    this.enableTempForm();
  }

  enableTempForm() {
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdTypeControl').enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdControl').enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardDOBControl').enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardNumberControl').enable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardTreatCodeControl').enable();
  }

  disableTempForm() {
    this.zakautWithTempCardForm.disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdTypeControl').disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardIdControl').disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardDOBControl').disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardNumberControl').disable();
    this.zakautWithTempCardForm.get('_zakautWithTempCardTreatCodeControl').disable();
  }
  //#endregion

  //#region ZakautManual
  createFormManual() {
    this.zakautManualForm = this.fb.group({
      _zakautManualIdTypeControl: new FormControl({ value: '1', disabled: true }, [Validators.required]),
      _zakautManualIdControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern(this.vars.zakautManualForm.idInputRule)
      ]),
      _zakautManualDOBControl: new FormControl({ value: '', disabled: true }, [Validators.required]),
      _zakautManualCardNumberControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.vars.zakautManualForm.cardInputRule)
      ]),
      _zakautManualReasonControl: new FormControl({ value: '', disabled: true }, [Validators.required]),
      _zakautManualTreatCodeControl: new FormControl({ value: '' }, [Validators.required])
    });
    this.enableManualForm();
  }

  enableManualForm() {
    this.zakautManualForm.get('_zakautManualIdTypeControl').enable();
    this.zakautManualForm.get('_zakautManualIdControl').enable();
    this.zakautManualForm.get('_zakautManualDOBControl').enable();
    this.zakautManualForm.get('_zakautManualReasonControl').enable();
    this.zakautManualForm.get('_zakautManualCardNumberControl').enable();
    this.zakautManualForm.get('_zakautManualTreatCodeControl').enable();
  }

  disableManualForm() {
    this.zakautManualForm.disable();
    this.zakautManualForm.get('_zakautManualIdTypeControl').disable();
    this.zakautManualForm.get('_zakautManualIdControl').disable();
    this.zakautManualForm.get('_zakautManualDOBControl').disable();
    this.zakautManualForm.get('_zakautManualCardNumberControl').disable();
    this.zakautManualForm.get('_zakautManualReasonControl').disable();
    this.zakautManualForm.get('_zakautManualTreatCodeControl').disable();
  }
  //#endregion

  onChanges(): void {
    this.zakautWithCardForm.get('_zakautWithCardControl').valueChanges.subscribe(() => {
      if (this.zakautWithCardForm.get('_zakautWithCardControl').valid) {
        if (!this.timerActive) {
          this.validateCard(this.zakautWithCardForm);
        }
      }
    });
    this.zakautWithCardForm.get('_zakautWithCardTreatCodeControl').valueChanges.subscribe(val => {
      if (val !== '') {
        this.hideCardInput = false;
      }
    });
  }

  validateCard(form: FormGroup) {
    this.zakautRequest = this.buildRequest(form);
    this.zakautStore.dispatch(new fromZakautStore.CheckZakaut(this.zakautRequest));
  }

  // TODO: Make Generic
  buildRequest(form: FormGroup): ZakautQueryModel {
    this.clearRequest();
    switch (form) {
      case this.zakautWithCardForm: {
        this.zakautRequest.requestType = '01';
        this.zakautRequest.cardNumber = form.get('_zakautWithCardControl').value.slice(1);
        this.zakautRequest.idType = this.zakautRequest.cardNumber.slice(6, 7);
        form.get('_zakautWithCardControl').setValue(null);
        form.get('_zakautWithCardControl').disable();
        break;
      }
      case this.zakautWithTempCardForm: {
        this.zakautRequest.requestType = '02';
        this.zakautRequest.id = form.get('_zakautWithTempCardIdControl').value;
        this.zakautRequest.idType = form.get('_zakautWithTempCardIdTypeControl').value;
        this.zakautRequest.dateOfBirth = form.get('_zakautWithTempCardDOBControl').value;
        this.zakautRequest.cardNumber = form.get('_zakautWithTempCardNumberControl').value;
        break;
      }
      case this.zakautManualForm: {
        this.zakautRequest.requestType = '03';
        this.zakautRequest.id = form.get('_zakautManualIdControl').value;
        this.zakautRequest.idType = form.get('_zakautManualIdTypeControl').value;
        this.zakautRequest.dateOfBirth = form.get('_zakautManualDOBControl').value;
        if (!form.get('_zakautManualCardNumberControl').disabled) {
          this.zakautRequest.cardNumber = form.get('_zakautManualCardNumberControl').value;
        }
        this.zakautRequest.noCardReason = form.get('_zakautManualReasonControl').value;
        break;
      }
    }
    return this.zakautRequest;
  }

  clearRequest() {
    this.zakautRequest.requestType = null;
    this.zakautRequest.cardNumber = null;
    this.zakautRequest.id = null;
    this.zakautRequest.idType = null;
    this.zakautRequest.dateOfBirth = null;
    this.zakautRequest.noCardReason = null;
  }

  private createTimer(): Observable<number> {
    return timer(0, 1000);
  }
}
