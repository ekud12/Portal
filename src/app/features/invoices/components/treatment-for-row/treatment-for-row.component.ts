import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Sapak, SapakTreatment } from '../../../user/models/sapak.model';
import { Invoice, InvoiceTreatment } from '../../models/class-models/objects.model';
import { NewTreatmentForRowRequest } from '../../models/requests-models/requests';

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
  selector: 'app-treatment-for-row',
  templateUrl: './treatment-for-row.component.html',
  styleUrls: ['./treatment-for-row.component.css']
})
export class NewTreatmentForRowComponent implements OnInit, AfterViewInit {
  vars = {
    hideRequired: true,
    floatLabel: 'never',
    errors: {
      required: 'שדה חובה',
      minlength: 'נתון קצר מדי'
    },
    idTypes: [{ value: '1', viewValue: 'תז' }, { value: '9', viewValue: 'דרכון' }],
    comment: ''
  };

  chosenTreatCode: SapakTreatment;
  loggedUserName$: Observable<string>;
  currentSapak$: Observable<Sapak>;
  currentInvoice$: Observable<Invoice>;
  currentTreatment$: Observable<InvoiceTreatment>;
  isLoading$: Observable<boolean>;
  errors$: Observable<any>;
  matcher = new ErrorStateMatcher();
  canEnterPrice$: Observable<boolean>;
  minDate: Date;
  maxDate: Date;
  newTreatmentForRowRequest = new NewTreatmentForRowRequest();
  returnURL = '';
  srcComponent = '';
  @ViewChild('formTag') myForm;
  @ViewChild('treatChoices') treatChoices;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private userStore: Store<fromUserStore.UserState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    this.currentTreatment$ = this.invoiceStore.select(fromInvoiceStore.currentRowTreatmentSelector);
    this.canEnterPrice$ = this.userStore.select(fromUserStore.activeSapakCanEnterPriceSelector);
    this.errors$ = this.invoiceStore.select(fromInvoiceStore.invoiceRowsErrorsSelector);
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.invoiceRowsLoadingSelector);
  }

  ngAfterViewInit() {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnURL = params.returnUrl;
      this.srcComponent = params.src;
      if (this.srcComponent === 'duplicate') {
        console.log('duplicate');
      } else if (this.srcComponent === 'update') {
        console.log('update');
      } else {
        console.log('create');
      }
    });
    this.initFutureRequests(this.srcComponent);
    this.maxDate = moment().toDate();
    this.minDate = moment()
      .add(-12, 'month')
      .toDate();
  }

  initFutureRequests(src: string) {
    this.loggedUserName$.subscribe(username => (this.newTreatmentForRowRequest.userName = username));
    this.currentSapak$.subscribe(spk => {
      this.newTreatmentForRowRequest.kodSapak = spk.kodSapak;
    });
    this.currentInvoice$.subscribe(inv => {
      if (inv !== null) {
        this.newTreatmentForRowRequest.billMonth = inv.billMonthField;
        this.newTreatmentForRowRequest.invoiceNum = inv.invoiceNumField;
      }
    });
    switch (src) {
      case 'create': {
        this.newTreatmentForRowRequest.treatCount = '1';
        this.newTreatmentForRowRequest.date = new Date();
        break;
      }
      case 'duplicate': {
        this.currentTreatment$.subscribe(val => {
          this.newTreatmentForRowRequest.treatCount = val.treatmentNumField;
          this.newTreatmentForRowRequest.date = new Date(val.dateField);
          this.newTreatmentForRowRequest.treat = val.treatmentCodeField;
          this.currentSapak$.take(1).subscribe(spk => {
            if (spk.treatments.find(v => v.treatCode === val.treatmentCodeField)) {
              this.chosenTreatCode = spk.treatments.find(v => v.treatCode === val.treatmentCodeField);
            }
          });
        });
        break;
      }
    }
  }

  addTreatmentForRow() {
    this.newTreatmentForRowRequest.treat = this.chosenTreatCode.treatCode;
    console.log(this.newTreatmentForRowRequest);
    this.invoiceStore.dispatch(new fromInvoiceStore.CreateNewTreatmentForInvoiceRow(this.newTreatmentForRowRequest));
  }

  reset() {
    this.myForm.resetForm({ treatCount: '1', date: new Date() });
  }

  goBack() {
    this.router.navigateByUrl(this.returnURL);
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
