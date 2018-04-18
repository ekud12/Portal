import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import { Observable } from 'rxjs/Observable';

import { Sapak } from '../../../user/models/sapak.model';
import { NewInvoiceRequest } from '../../models/new-actions.model';

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
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  vars = {
    hideRequired: true,
    floatLabel: 'never',
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי'
    },
    comment: 'ניתן ליצור חשבונית עד חודשיים לאחור***',
    availableMonths: getDatesForInvoiceCreation(3)
  };
  loggedUserName$: Observable<string>;
  currentSapak$: Observable<Sapak>;
  matcher = new ErrorStateMatcher();
  newInvoiceRequest = new NewInvoiceRequest(this.vars.availableMonths[0], null, null);
  newInvoiceForm: FormGroup;
  @ViewChild('formTag') myForm;
  constructor(
    private fb: FormBuilder,
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private userStore: Store<fromUserStore.UserState>
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
  }

  ngOnInit() {
    this.newInvoiceForm = this.fb.group({
      invoiceDateControl: new FormControl({ value: '' }, [Validators.required]),
      invoiceIdControl: new FormControl(null, [Validators.required]),
      invoiceRemarksControl: new FormControl(null)
    });
    this.loggedUserName$.subscribe(username => (this.newInvoiceRequest.userName = username));
    this.currentSapak$.subscribe(spk => (this.newInvoiceRequest.kodSapak = spk.kodSapak));
  }

  createNewInvoice() {
    this.invoiceStore.dispatch(new fromInvoiceStore.CreateInvoice(this.newInvoiceRequest));
  }

  reset() {
    this.myForm.resetForm();
    this.newInvoiceForm.get('invoiceDateControl').setValue(this.vars.availableMonths[0]);
  }
}

const getDatesForInvoiceCreation = range => {
  const datePipe = new DatePipe('en-US');
  const now = new Date();
  return [...Array.from(Array(range).keys())].map(v =>
    datePipe.transform(new Date(now.getFullYear(), now.getMonth() - v), 'MM/yyyy')
  );
};
