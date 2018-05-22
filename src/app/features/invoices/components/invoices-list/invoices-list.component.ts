import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import { Invoice, PrintingOption } from '../../models/class-models/objects.model';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['billMonthField', 'invoiceNumField', 'totalRowsNumField', 'invoiceSumField', 'statusField'];
  displayedColumnsMap = [
    { value: 'billMonthField', viewValue: 'תאריך חשבונית' },
    { value: 'invoiceNumField', viewValue: 'מספר חשבונית' },
    { value: 'totalRowsNumField', viewValue: 'סה"כ שורות' },
    { value: 'invoiceSumField', viewValue: 'סכום חשבונית' },
    { value: 'statusField', viewValue: 'סטטוס חשבונית' }
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
  isLoading$: Observable<boolean>;
  isLoadingBigData;
  dataObject: PrintObject = new PrintObject();
  selectedFilter;
  dataSource;
  req = new SapakDataRequest();
  displayNoRecords = false;
  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private routerStore: Store<fromRoot.AppState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>,
    public dialog: MatDialog
  ) {
    this.isLoadingBigData = true;
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.listOfInvoices$ = this.invoiceStore.select(fromInvoiceStore.allInvoicesSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.invoiceLoadingSelector);
  }

  ngAfterViewInit() {
    /** TO allow content to load while building the view  */
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingBigData = false;
    }, 50);
  }

  ngOnInit() {
    this.loggedUserName$.subscribe(val => (this.req.userName = val));
    this.currentSapak$.subscribe(spk => {
      this.dataObject.headerDetailsValue1 = spk.kodSapak;
      this.dataObject.headerDetailsValue2 = spk.description;
      this.req.kodSapak = spk.kodSapak;
    });

    this.listOfInvoices$.subscribe(val => {
      this.dataSource = new MatTableDataSource<Invoice>(val);

      /** initial sorting by date -> id */
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: Invoice, filter: string) => data.invoiceNumField.toString().includes(filter);
      this.dataSource.connect().value.sort((a, b) => {
        return (
          moment(b.billMonthField, 'MM/YYYY').valueOf() - moment(a.billMonthField, 'MM/YYYY').valueOf() ||
          b.invoiceNumField - a.invoiceNumField
        );
      });
    });
  }

  print(): void {
    this.buildObjectForPrint();
    this.sharedStore.dispatch(new fromSharedStore.SetPrintData(this.dataObject));
    this.routerStore.dispatch(new fromRoot.Go({ path: ['print'], query: { isIE: true, returnUrl: this.router.url } }));
  }

  newInvoice() {
    this.routerStore.dispatch(new fromRoot.Go({ path: ['portal/invoices/newInvoice'] }));
  }

  applyFilterInvoiceNumber(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.filteredData.length === 0) {
      this.displayNoRecords = true;
    } else {
      this.displayNoRecords = false;
    }
  }

  activateInvoice(inv: any) {
    this.req.invoice = inv;
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoice(this.req));
  }

  buildObjectForPrint() {
    this.dataObject.mainHeader = 'ריכוז חשבוניות';
    this.dataObject.printOption = PrintingOption.INVOICES;
    this.dataObject.dialogHeader = 'הדפסת רשימת חשבוניות';
    this.dataObject.displayedColumns = this.displayedColumns;
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }
}
