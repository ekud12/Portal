import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { NewInvoiceRequest } from '../../models/new-actions.model';
import { DatePipe } from '@angular/common';

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

  matcher = new ErrorStateMatcher();
  newInvoiceRequest = new NewInvoiceRequest(this.vars.availableMonths[0], null, null);
  newInvoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.newInvoiceForm = this.fb.group({
      invoiceDateControl: new FormControl({ value: '' }, [Validators.required]),
      invoiceIdControl: new FormControl({ value: '' }, [Validators.required, Validators.minLength(4)]),
      invoiceRemarksControl: new FormControl({ value: '' })
    });
  }

  createNewInvoice() {
    console.log(this.newInvoiceRequest);
  }

  reset() {
    this.newInvoiceForm.reset();
    this.newInvoiceForm.get('invoiceDateControl').setValue(this.vars.availableMonths[0]);
    console.log(this.newInvoiceForm);
  }

  test() {
    console.log(this.newInvoiceRequest);
  }
}

const getDatesForInvoiceCreation = range => {
  const datePipe = new DatePipe('en-US');
  const now = new Date();
  return [...Array.from(Array(range).keys())].map(v =>
    datePipe.transform(new Date(now.getFullYear(), now.getMonth() - v), 'MM/yyyy')
  );
};
