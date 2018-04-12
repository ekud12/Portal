import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDatepickerInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import * as moment from 'moment';
import * as fromInvoiceStore from '@invoicesStore';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { Invoice, PrintingOption } from '../../models/new-actions.model';
import { Sapak } from '../../../user/models/sapak.model';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';

import { PrintLayoutComponent } from '../../../../shared/print-layout/print-layout.component';
import { AlertDialogComponent } from 'app/shared/alert-dialog/alert-dialog.component';
import { InvoiceStatusPipe } from 'app/shared/utils/invoice-status.pipe';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['billMonth', 'invoiceNum', 'totalRowsNum', 'invoiceSum', 'status'];
  displayedColumnsMap = [
    { value: 'billMonth', viewValue: 'תאריך חשבונית' },
    { value: 'invoiceNum', viewValue: 'מספר חשבונית' },
    { value: 'totalRowsNum', viewValue: 'סה"כ שורות' },
    { value: 'invoiceSum', viewValue: 'סכום חשבונית' },
    { value: 'status', viewValue: 'סטטוס חשבונית' }
  ];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userName: string;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  listOfInvoices$: Observable<Invoice[]>;
  currentInvoice$: Observable<Invoice>;
  dataObject: PrintObject = new PrintObject();
  selectedFilter;
  dataSource;
  color = 'red';
  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>,
    public dialog: MatDialog
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.listOfInvoices$ = this.invoiceStore.select(fromInvoiceStore.allInvoicesSelector);
    this.listOfInvoices$.subscribe(val => {
      this.dataSource = new MatTableDataSource<Invoice>(val);
      /** initial sorting by date -> id */
      this.dataSource.connect().value.sort((a, b) => {
        return moment(b.billMonth, 'MM/YYYY').valueOf() - moment(a.billMonth, 'MM/YYYY').valueOf() || b.invoiceNum - a.invoiceNum;
      });
    });
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
  }

  ngAfterViewInit() {
    /** TO allow content to load while building the view  */
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1);
  }

  ngOnInit() {
    this.currentSapak$.subscribe(spk => {
      this.dataObject.headerDetailsValue1 = spk.kodSapak;
      this.dataObject.headerDetailsValue2 = spk.description;
    });
    this.dataSource.filterPredicate = (data: Invoice, filter: string) => data.invoiceNum.toString().includes(filter);
  }

  print(): void {
    this.buildObjectForPrint();
    this.sharedStore.dispatch(new fromSharedStore.SetPrintData(this.dataObject));
    this.router.navigate(['print'], {
      queryParams: { isIE: true, returnUrl: this.router.url }
    });
  }

  newInvoice() {
    this.router.navigate(['portal/invoices/new']);
  }

  applyFilterInvoiceNumber(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  activateInvoice(inv: any) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoice(inv));
  }

  buildObjectForPrint() {
    this.dataObject.mainHeader = 'ריכוז חשבוניות';
    this.dataObject.printOption = PrintingOption.INVOICES;
    this.dataObject.dialogHeader = 'הדפסת רשימת חשבוניות';
    this.dataObject.displayedColumns = this.displayedColumns;
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }
}
