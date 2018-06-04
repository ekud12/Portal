import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Sapak } from '../../../user/models/sapak.model';
import { InvoiceRow, ObligationByCustomerId, ObligationByCustomerIdAndCommitment } from '../../models/class-models/objects.model';

@Component({
  selector: 'app-obligations-by-cust-id-and-commitment-report',
  templateUrl: './obligations-by-cust-id-and-commitment-report.component.html',
  styleUrls: ['./obligations-by-cust-id-and-commitment-report.component.css']
})
export class ObligationsByCustIdAndCommitmentReportComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'billMonthField',
    'invoiceNumField',
    'lineNumField',
    'commitmentIdField',
    'dateField',
    'treatmentCodeField',
    'treatmentDescField',
    'treatmentNumField',
    'amount2Field'
  ];
  displayedColumnsMap = [
    { value: 'billMonthField', viewValue: 'חודש' },
    { value: 'invoiceNumField', viewValue: 'מס חשבונית' },
    { value: 'lineNumField', viewValue: 'מספר שורה' },
    { value: 'commitmentIdField', viewValue: 'התחייבות' },
    { value: 'dateField', viewValue: 'תאריך' },
    { value: 'treatmentCodeField', viewValue: 'קוד טיפול' },
    { value: 'treatmentDescField', viewValue: 'תאור טיפול' },
    { value: 'treatmentNumField', viewValue: 'מספר טיפולים' },
    { value: 'amount2Field', viewValue: 'סכום' }
  ];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  obligationsByCustomerIdAndCommitment$: Observable<ObligationByCustomerIdAndCommitment[]>;
  activeInvoiceRow$: Observable<InvoiceRow>;
  isLoading$: Observable<boolean>;
  dataSource;
  displayNoRecords = false;
  returnURL;
  errors$: Observable<any>;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.obligationsByCustomerIdAndCommitment$ = this.invoiceStore.select(
      fromInvoiceStore.obligationsByCustomerIdAndCommitmentSelector
    );
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.miscLoadingSelector);
    this.activeInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
    this.errors$ = this.invoiceStore.select(fromInvoiceStore.miscErrorsSelector);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  ngOnInit() {
    this.obligationsByCustomerIdAndCommitment$.subscribe(val => {
      this.dataSource = new MatTableDataSource<ObligationByCustomerId>(val);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.connect().value.sort((a, b) => {
        return (
          moment(a.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() - moment(b.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() &&
          +b.invoiceNumField > +a.invoiceNumField &&
          +a.lineNumField > +b.lineNumField
        );
      });
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnURL = params.returnUrl;
    });
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }

  goBack() {
    this.router.navigateByUrl(this.returnURL);
  }
}
