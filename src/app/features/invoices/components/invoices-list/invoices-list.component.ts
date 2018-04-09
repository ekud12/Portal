import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { PageNotFoundComponent } from '../../../../shared/page-not-found/page-not-found.component';
import { InvoicesVars } from './table-utils';
import { Store } from '@ngrx/store';
import * as fromInvoiceStore from '@invoicesStore';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { Invoice, ElementInvoice, GetInvoicesRequest } from '../../models/new-actions.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PrintLayoutComponent } from '../../../../shared/print-layout/print-layout.component';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Sapak } from '../../../user/models/sapak.model';

const ELEMENT_DATA: ElementInvoice[] = [
  { invoiceId: 1, invoiceDate: '12/2018', invoiceTotalRows: 1, invoiceTotalSum: 1579, invoiceStatus: 0 },

  { invoiceId: 999, invoiceDate: '11/2018', invoiceTotalRows: 3, invoiceTotalSum: 1909, invoiceStatus: 1 },
  { invoiceId: 1116, invoiceDate: '12/2018', invoiceTotalRows: 2, invoiceTotalSum: 1579, invoiceStatus: 0 }
];
@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['invoiceDate', 'invoiceId', 'invoiceTotalRows', 'invoiceTotalSum', 'invoiceStatus'];
  displayedColumnsMap = [
    { value: 'invoiceDate', viewValue: 'תאריך חשבונית' },
    { value: 'invoiceId', viewValue: 'מספר חשבונית' },
    { value: 'invoiceTotalRows', viewValue: 'סה"כ שורות' },
    { value: 'invoiceTotalSum', viewValue: 'סכום חשבונית' },
    { value: 'invoiceStatus', viewValue: 'סטטוס חשבונית' }
  ];

  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  getAllInvoicesRequest = new GetInvoicesRequest();
  userName: string;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  listOfInvoices$: Observable<Invoice[]>;
  selectedFilter;
  selectedInvoice: Invoice = new Invoice();
  dataSourceTest: MatTableDataSource<Invoice>;
  dataSource = new MatTableDataSource<ElementInvoice>(ELEMENT_DATA);
  dataObject: PrintObject = new PrintObject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoiceState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.listOfInvoices$ = this.invoiceStore.select(fromInvoiceStore.allInvoicesSelector);
  }

  ngAfterViewInit() {
    /** TO allow content to load while building the view */
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1);
  }

  ngOnInit() {
    this.loggedUserName$.subscribe(username => {
      this.userName = username;
    });
    this.currentSapak$.subscribe(spkCode => {
      this.getAllInvoicesRequest.username = this.userName;
      this.getAllInvoicesRequest.sapakCode = spkCode.kodSapak;
      const a = this.invoiceStore.dispatch(new fromInvoiceStore.GetInvoices(this.getAllInvoicesRequest));
    });
    this.listOfInvoices$.subscribe(val => {
      
      this.dataSourceTest = new MatTableDataSource<Invoice>(val);
    });

    console.log(this.dataSourceTest);

    // this.selectedFilter = { value: 'invoiceId', viewValue: 'מספר חשבונית' };
    // this.dataSource.filterPredicate = (data: Element, filter: string) =>
    //   data[this.selectedFilter.value].toString().includes(filter) || filter === 'all';
    this.dataSource.filterPredicate = (data: ElementInvoice, filter: string) =>
      data.invoiceId.toString().includes(filter) || filter === 'all';
    /** initial sort by 2 date > id */
    this.dataSource.connect().value.sort((a, b) => {
      return moment(b.invoiceDate, 'MM/YYYY').valueOf() - moment(a.invoiceDate, 'MM/YYYY').valueOf() || b.invoiceId - a.invoiceId;
    });
  }

  buildData() {}

  print(): void {
    this.buildObjectForPrint();
    this.sharedStore.dispatch(new fromSharedStore.SetPrintData(this.dataObject));
    this.router.navigate(['print'], {
      queryParams: { isIE: true, returnUrl: this.router.url }
    });
  }

  buildObjectForPrint() {
    this.dataObject.headerDetailsText1 = 'קוד ספק:';
    this.dataObject.headerDetailsText2 = 'שם ספק:';
    this.dataObject.headerDetailsValue1 = '999999';
    this.dataObject.headerDetailsValue2 = 'test';
    this.dataObject.subHeader = 'ריכוז חשבוניות';
    this.dataObject.btn1Action = 'הדפס';
    this.dataObject.isInvoiceAction = true;
    this.dataObject.mainHeader = 'ריכוז חשבוניות עבור חודש בלה בלה';
    this.dataObject.isTableContent = true;
    this.dataObject.lowerContent = [
      { desc: 'פרטי ספק ב SAP', value: '' },
      { desc: 'מספר ח.פ: ', value: 'TBD' },
      { desc: 'שם ספק: ', value: 'TBD' },
      { desc: 'קוד ספק: ', value: 'TBD' },
      { desc: 'חשבון בנק: ', value: 'TBD' }
    ];
    this.dataObject.recipient = { greeting: 'לכבוד מאוחדת', address: 'אבן גבירול 124', city: 'תל אביב' };
    this.dataObject.dialogHeader = 'הדפסת דרישת תשלום וסגירת חשבונית';
    this.dataObject.displayedColumns = ['invoiceDate', 'invoiceId', 'invoiceTotalRows', 'invoiceTotalSum', 'invoiceStatus'];
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }

  applyFilterInvoiceNumber(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  activateInvoice(inv: any) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoice(inv));
  }

  setDateLowerBoundry(lowerDate) {
    console.log(lowerDate.value);
  }
}

export class MyDataSource extends DataSource<any[]> {
  constructor(private subject: BehaviorSubject<any[]>) {
    super();
  }
  connect(): Observable<any[]> {
    return this.subject.asObservable();
  }
  disconnect(): void {}
}
