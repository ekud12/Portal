import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { PageNotFoundComponent } from '../../../../shared/page-not-found/page-not-found.component';
import { InvoicesVars } from './table-utils';
import { Store } from '@ngrx/store';
import * as fromInvoiceStore from '@invoicesStore';
import * as fromSharedStore from '@sharedStore';
import { Invoice } from '../../models/new-actions.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PrintLayoutComponent } from '../../../../shared/print-layout/print-layout.component';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface Element {
  invoiceId: number;
  invoiceDate: string;
  invoiceTotalRows: number;
  invoiceTotalSum: number;
  invoiceStatus: number;
}

const ELEMENT_DATA: Element[] = [
  { invoiceId: 4987, invoiceDate: '12/2018', invoiceTotalRows: 5, invoiceTotalSum: 1579, invoiceStatus: 0 },
  { invoiceId: 49187, invoiceDate: '12/2018', invoiceTotalRows: 5, invoiceTotalSum: 1579, invoiceStatus: 0 },
  { invoiceId: 14117, invoiceDate: '11/2018', invoiceTotalRows: 12, invoiceTotalSum: 1909, invoiceStatus: 1 },
  { invoiceId: 24117, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
  { invoiceId: 35117, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
  { invoiceId: 17117, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
  { invoiceId: 241175, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
  { invoiceId: 351157, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
  { invoiceId: 1711557, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
  { invoiceId: 5115817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 51151817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 348117, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 941117, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 1261217, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
  { invoiceId: 221112342, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
  { invoiceId: 1711683, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
  { invoiceId: 5281317, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
  { invoiceId: 911187, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 14117, invoiceDate: '11/2018', invoiceTotalRows: 12, invoiceTotalSum: 1909, invoiceStatus: 1 },
  { invoiceId: 24117, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
  { invoiceId: 3517, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
  { invoiceId: 1717, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
  { invoiceId: 5817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 34817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 94117, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 126217, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
  { invoiceId: 22112342, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
  { invoiceId: 171683, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
  { invoiceId: 528317, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
  { invoiceId: 91187, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 121787, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
  { invoiceId: 22122, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
  { invoiceId: 17173, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
  { invoiceId: 5217, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
  { invoiceId: 31137, invoiceDate: '01/2018', invoiceTotalRows: 111, invoiceTotalSum: 20199, invoiceStatus: 1 },
  { invoiceId: 49837, invoiceDate: '12/2018', invoiceTotalRows: 5, invoiceTotalSum: 1579, invoiceStatus: 0 },
  { invoiceId: 491387, invoiceDate: '12/2018', invoiceTotalRows: 5, invoiceTotalSum: 1579, invoiceStatus: 0 },
  { invoiceId: 141317, invoiceDate: '11/2018', invoiceTotalRows: 12, invoiceTotalSum: 1909, invoiceStatus: 1 },
  { invoiceId: 241317, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
  { invoiceId: 351317, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
  { invoiceId: 171317, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
  { invoiceId: 2413175, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
  { invoiceId: 3513157, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
  { invoiceId: 17131557, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
  { invoiceId: 51135817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 511351817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 3481137, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 9411137, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 12612172, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
  { invoiceId: 2211122342, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
  { invoiceId: 17116283, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
  { invoiceId: 52812317, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
  { invoiceId: 9112187, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 142117, invoiceDate: '11/2018', invoiceTotalRows: 12, invoiceTotalSum: 1909, invoiceStatus: 1 },
  { invoiceId: 224117, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
  { invoiceId: 23517, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
  { invoiceId: 17172, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
  { invoiceId: 58127, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 342817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
  { invoiceId: 924117, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 1262127, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
  { invoiceId: 22112342, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
  { invoiceId: 1716283, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
  { invoiceId: 52228317, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
  { invoiceId: 91187, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
  { invoiceId: 1217872, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
  { invoiceId: 221222, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
  { invoiceId: 171723, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
  { invoiceId: 52127, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
  { invoiceId: 31217, invoiceDate: '01/2018', invoiceTotalRows: 111, invoiceTotalSum: 20199, invoiceStatus: 1 }
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
  events: string[] = [];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  selectedFilter;
  selectedInvoice: Invoice = new Invoice();
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  testObject: PrintObject = new PrintObject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoiceState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>
  ) {}

  ngAfterViewInit() {
    /** TO allow content to load while building the view */
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1);
  }

  ngOnInit() {
    this.selectedFilter = { value: 'invoiceId', viewValue: 'מספר חשבונית' };
    // this.dataSource.filterPredicate = (data: Element, filter: string) =>
    //   data[this.selectedFilter.value].toString().includes(filter) || filter === 'all';
    this.dataSource.filterPredicate = (data: Element, filter: string) =>
      data.invoiceId.toString().includes(filter) || filter === 'all';
  }

  buildData() {}

  print(): void {
    this.buildObjectForPrint();
    this.sharedStore.dispatch(new fromSharedStore.SetPrintData(this.testObject));
    this.router.navigate(['print'], {
      queryParams: { isIE: true, returnUrl: this.router.url}
    });
    // if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    //   const evt = document.createEvent('UIEvents');
    //   evt.initUIEvent('resize', true, false, window, 0);

    // } else {
    //   this.dialog.open(PrintLayoutComponent, {
    //     data: this.testObject,
    //     height: '83%',
    //     width: '90%'
    //   });
    // }
  }

  buildObjectForPrint() {
    this.testObject.headerDetailsText1 = 'קוד ספק:';
    this.testObject.headerDetailsText2 = 'שם ספק:';
    this.testObject.headerDetailsValue1 = '999999';
    this.testObject.headerDetailsValue2 = 'test';
    this.testObject.subHeader = 'ריכוז חשבוניות';
    this.testObject.btn1Action = 'הדפס';
    this.testObject.isInvoiceAction = true;
    this.testObject.mainHeader = 'ריכוז חשבוניות עבור חודש בלה בלה';
    this.testObject.isTableContent = true;
    this.testObject.lowerContent = null;
    // [
    //   { desc: 'פרטי ספק ב SAP', value: '' },
    //   { desc: 'מספר ח.פ: ', value: 'TBD' },
    //   { desc: 'שם ספק: ', value: 'TBD' },
    //   { desc: 'קוד ספק: ', value: 'TBD' },
    //   { desc: 'חשבון בנק: ', value: 'TBD' }
    // ];
    this.testObject.recipient = { greeting: 'לכבוד מאוחדת', address: 'אבן גבירול 124', city: 'תל אביב' };
    this.testObject.dialogHeader = 'הדפסת דרישת תשלום וסגירת חשבונית';
    this.testObject.displayedColumns = ['invoiceDate', 'invoiceId', 'invoiceTotalRows', 'invoiceTotalSum', 'invoiceStatus'];
    this.testObject.dismap = this.displayedColumnsMap;
    this.testObject.data = this.dataSource.connect().value;
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
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
