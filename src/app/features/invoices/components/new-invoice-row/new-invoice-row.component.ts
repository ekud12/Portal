import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { Sapak } from '../../../user/models/sapak.model';
import { Invoice, NewInvoiceRowRequest } from '../../models/new-actions.model';

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
export class NewInvoiceRowComponent implements OnInit, AfterViewInit {
  vars = {
    hideRequired: true,
    floatLabel: 'never',
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי'
    },
    idTypes: [{ value: '1', viewValue: 'תז' }, { value: '9', viewValue: 'דרכון' }],
    comment: '',
    availableMonths: getDatesForInvoiceCreation(3)
  };
  loggedUserName$: Observable<string>;
  currentSapak$: Observable<Sapak>;
  currentInvoice$: Observable<Invoice>;
  matcher = new ErrorStateMatcher();
  canEnterPrice$: Observable<boolean>;
  minDate: Date;
  maxDate: Date;
  newInvoiceRowRequest = new NewInvoiceRowRequest('', '', '', null, '', null, '');
  @ViewChild('formTag') myForm;
  @ViewChild('treatChoices') treatChoices;

  constructor(private invoiceStore: Store<fromInvoiceStore.InvoicesState>, private userStore: Store<fromUserStore.UserState>) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    this.canEnterPrice$ = this.userStore.select(fromUserStore.activeSapakCanEnterPriceSelector);
  }

  ngAfterViewInit() {}
  ngOnInit() {
    this.maxDate = moment().toDate();
    this.minDate = moment()
      .add(-6, 'month')
      .toDate();
    this.loggedUserName$.subscribe(username => (this.newInvoiceRowRequest.userName = username));
    this.currentSapak$.subscribe(spk => {
      this.newInvoiceRowRequest.kodSapak = spk.kodSapak;
    });
  }

  addInvoiceRow() {
    console.log(this.newInvoiceRowRequest);
    // if error returned stay here and display error if success go back to rows
    // this.invoiceStore.dispatch(new fromInvoiceStore.CreateInvoice(this.newInvoiceRowRequest));
  }

  reset() {
    this.myForm.resetForm({ custIdType: this.vars.idTypes[0].value });
  }

  updateTreatValue(e) {
    this.currentSapak$.take(1).subscribe(spk => {
      if (spk.treatments.find(v => v.treatCode === e)) {
        this.myForm['controls']['treat'].setValue(spk.treatments.find(v => v.treatCode === e));
      }
      if (e === '' || !spk.treatments.find(v => v.treatCode === e)) {
        this.myForm['controls']['treat'].setValue(null);
      }
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
