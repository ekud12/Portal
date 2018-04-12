import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import * as fromInvoiceStore from '@invoicesStore';
import * as fromUserStore from '@userStore';
import { NewInvoiceRequest, Invoice, NewInvoiceRowRequest } from '../../models/new-actions.model';
import { Observable } from 'rxjs/Observable';
import { Sapak, SapakTreatment } from '../../../user/models/sapak.model';

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
  selector: 'app-new-invoice-row',
  templateUrl: './new-invoice-row.component.html',
  styleUrls: ['./new-invoice-row.component.css']
})
export class NewInvoiceRowComponent implements OnInit {
  vars = {
    hideRequired: true,
    floatLabel: 'never',
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי'
    },
    idTypes: [{ value: '1', viewValue: 'ת"ז' }, { value: '9', viewValue: 'דרכון' }],
    comment: '',
    availableMonths: getDatesForInvoiceCreation(3)
  };
  loggedUserName$: Observable<string>;
  currentSapak$: Observable<Sapak>;
  currentInvoice$: Observable<Invoice>;
  matcher = new ErrorStateMatcher();

  newInvoiceRowRequest = new NewInvoiceRowRequest('', '', this.vars.idTypes[0].value, '', null, '', null, '');
  @ViewChild('formTag') myForm;
  @ViewChild('treatChoices') treatChoices;

  constructor(private invoiceStore: Store<fromInvoiceStore.InvoicesState>, private userStore: Store<fromUserStore.UserState>) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
  }

  ngOnInit() {
    this.loggedUserName$.subscribe(username => (this.newInvoiceRowRequest.userName = username));
    this.currentSapak$.subscribe(spk => {
      this.newInvoiceRowRequest.kodSapak = spk.kodSapak;
    });
  }

  addInvoiceRow() {
    console.log(this.newInvoiceRowRequest);
    // this.invoiceStore.dispatch(new fromInvoiceStore.CreateInvoice(this.newInvoiceRowRequest));
  }

  reset() {
    this.myForm.resetForm();
    this.newInvoiceRowRequest = new NewInvoiceRowRequest('', '', this.vars.idTypes[0].value, '', null, '', null, '');
  }

  updateTreatValue(e) {
    this.currentSapak$.take(1).subscribe(spk => {
      console.log(e);
      if (spk.treatments.find(v => v.treatCode === e)) {
        this.myForm['controls']['treat'].setValue(spk.treatments.find(v => v.treatCode === e));
      }

      if (e === '' || !spk.treatments.find(v => v.treatCode === e)) {
        this.myForm['controls']['treat'].setValue(null);
      }
      console.log(this.myForm);
    });
  }
}

const getDatesForInvoiceCreation = range => {
  const datePipe = new DatePipe('en-US');
  const now = new Date();
  return [...Array.from(Array(range).keys())].map(v =>
    datePipe.transform(new Date(now.getFullYear(), now.getMonth() - v), 'MM/yyyy')
  );
};
