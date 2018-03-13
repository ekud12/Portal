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
import { timer } from 'rxjs/observable/timer';
import { take, map, switchMap, tap } from 'rxjs/operators';

export class ZakautErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    if (!control.value) {
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
    idTypes: [
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
      cardInputRule: '^B([0-9]{5}=[0-9]{30})+$'
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
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  zakautResponse$: Observable<string>;
  zakautErrors$: Observable<string[]>;
  zakautRequest = new ZakautQueryModel();
  timerActive = false;

  @ViewChild('cardFocusFirstTag') cardInputFocus;

  countDown$;
  count = 15;
  autoCheck = false;

  tabsDisabled = false;
  selectedValueForIdType = '1';

  zakautWithCardForm: FormGroup;
  zakautWithTempCardForm: FormGroup;
  zakautManualForm: FormGroup;

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
    this.zakautResponse$ = this.zakautStore.select(
      fromZakautStore.zakautResponseSelector
    );
    this.zakautErrors$ = this.zakautStore.select(
      fromZakautStore.zakautErrorsSelector
    );
    this.loggedUserName$ = this.userStore.select(
      fromUserStore.userNameSelector
    );
    this.createForms();
  }

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
            this.tabsDisabled = true;
            this.zakautRequest.isSurgeon = false;
            break;
          }
          case Zakaut.With_Card_And_Manual_Not_Surgeon: {
            this.zakautManualForm
              .get('_zakautManualCardNumberControl')
              .enable();
            this.zakautRequest.isSurgeon = false;
            break;
          }
          case Zakaut.With_Card_And_Manual_Surgeon: {
            this.zakautRequest.isSurgeon = true;
            break;
          }
        }
      } else {
        this.disableAllForms();
      }
    });

    // loaders
    // this.isValidating$.subscribe(val => {
    //   if (val) {
    //     this.disableAllForms();
    //   } else {
    //     this.enableAllForms();
    //   }
    // });

    // setFocus on card input
    this.setFocus();
    this.onChanges();
  }
  onChanges(): void {
    this.zakautWithCardForm.valueChanges.subscribe(val => {
      if (this.zakautWithCardForm.valid) {
        if (!this.timerActive) {
          this.validateCard(this.zakautWithCardForm);
        } else {
          this.zakautWithCardForm.get('_zakautWithCardControl').setValue(null);
        }
      }
    });
  }
  setFocus() {
    this.cardInputFocus.nativeElement.focus();
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
          (this.count = 10),
            this.zakautStore.dispatch(new fromZakautStore.ResetZakaut());
          this.zakautWithCardForm.get('_zakautWithCardControl').enable();
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
      _zakautWithTempCardIdTypeControl: new FormControl(
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
      .get('_zakautWithTempCardIdTypeControl')
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
      .get('_zakautWithTempCardIdTypeControl')
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
      _zakautManualIdTypeControl: new FormControl(
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
    this.zakautManualForm.get('_zakautManualIdTypeControl').enable();
    this.zakautManualForm.get('_zakautManualIdControl').enable();
    this.zakautManualForm.get('_zakautManualDOBControl').enable();
    this.zakautManualForm.get('_zakautManualReasonControl').enable();
    this.zakautManualForm.get('_zakautManualCardNumberControl').enable();
  }

  disableManualForm() {
    this.zakautManualForm.disable();
    this.zakautManualForm.get('_zakautManualIdTypeControl').disable();
    this.zakautManualForm.get('_zakautManualIdControl').disable();
    this.zakautManualForm.get('_zakautManualDOBControl').disable();
    this.zakautManualForm.get('_zakautManualCardNumberControl').disable();
    this.zakautManualForm.get('_zakautManualReasonControl').disable();
  }
  //#endregion

  validateCard(form: FormGroup) {
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
        this.zakautRequest.cardNumber = form
          .get('_zakautWithCardControl')
          .value.slice(1);
        this.zakautRequest.idType = this.zakautRequest.cardNumber.slice(0, 1);
        form.get('_zakautWithCardControl').setValue(null);
        form.get('_zakautWithCardControl').disable();
        break;
      }
      case this.zakautWithTempCardForm: {
        this.zakautRequest.requestType = '02';
        this.zakautRequest.id = form.get('_zakautWithTempCardIdControl').value;
        this.zakautRequest.idType = form.get(
          '_zakautWithTempCardIdTypeControl'
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
        this.zakautRequest.idType = form.get(
          '_zakautManualIdTypeControl'
        ).value;
        this.zakautRequest.dateOfBirth = form.get(
          '_zakautManualDOBControl'
        ).value;
        if (!form.get('_zakautManualCardNumberControl').disabled) {
          this.zakautRequest.cardNumber = form.get(
            '_zakautManualCardNumberControl'
          ).value;
        }
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
    this.zakautRequest.idType = null;
    this.zakautRequest.dateOfBirth = null;
    this.zakautRequest.noCardReason = null;
  }

  private createTimer(): Observable<number> {
    return timer(0, 1000);
  }
}
