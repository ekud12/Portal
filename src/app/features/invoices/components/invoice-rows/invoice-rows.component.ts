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
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
import { ToastService } from 'app/core/services/toast-service.service';

@Component({
  selector: 'app-invoice-rows',
  templateUrl: './invoice-rows.component.html',
  styleUrls: ['./invoice-rows.component.css']
})
export class InvoiceRowsComponent implements OnInit, AfterViewInit {
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
  selectedFilter = this.displayedColumnsMap[1];
  dataSource;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>,
    public dialog: MatDialog,
    private toaster: ToastService
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.listOfInvoices$ = this.invoiceStore.select(fromInvoiceStore.allInvoicesSelector);
    this.listOfInvoices$.subscribe(val => {
      this.dataSource = new MatTableDataSource<Invoice>(val);
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

    this.dataSource.filterPredicate = (data: Element, filter: string) =>
      data[this.selectedFilter.value].toString().includes(filter) || filter === 'all';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  printData(type: PrintingOption): void {
    switch (type) {
      case PrintingOption.ROWS: {
        this.buildPrintObjectRows();
        break;
      }
      case PrintingOption.SUMMARY: {
        this.buildPrintObjectSummary();
        break;
      }
      case PrintingOption.CLOSE_INVOICE: {
        this.buildPrintObjectCloseInvoice();
        break;
      }
    }
    this.sharedStore.dispatch(new fromSharedStore.SetPrintData(this.dataObject));
    this.router.navigate(['print'], {
      queryParams: { isIE: true, returnUrl: this.router.url }
    });
  }

  activateInvoiceRow(row: any) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoiceRow(row));
  }

  newInvoiceRow() {
    this.currentInvoice$.take(1).subscribe(val => {
      if (val.status === 0 || val.status === 1) {
        this.router.navigate(['portal/invoices/newRow']);
      } else {
        this.toaster.openSnackBar('סטטוס חשבונית פעילה לא מאפשר הוספת שורה חדשה.');
      }
    });
  }

  closeInvoice() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { data: 'לאחר הפקת דרישת התשלום, לא ניתן יהיה לעדכן את החשבונית.' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /** add logic to close invoice and only than go to print */
        this.printData(5);
      }
    });
  }
  /************************************************  BUILD OBJECTS FOR PRINTING ****************************************************/
  buildPrintObjectCloseInvoice() {
    this.currentInvoice$.take(1).subscribe(inv => {
      this.dataObject.mainHeader = `דרישת תשלום מספר ${inv.invoiceNum} לחודש ${inv.billMonth}.`;
      this.dataObject.specialData = [
        `הננו מתכבדים להגיש דרישת תשלום מספר: ${inv.invoiceNum} בגין השירותים שסיפקנו ללקוחות מאוחדת בחודש ${inv.billMonth}.`,
        `סכום חשבון לפני מע"מ: ${inv.typedSum},  מע"מ: ${inv.vatPer},    סכום חשבון כולל מע"מ: ${inv.invoiceSum}.`,
        `יחד עם דרישת התשלום אנו מצרפים את התיעוד הרפואי של הטיפולים והשירותים הכלולים בדרישה זו.`,
        `לפרטים נוספים : איש קשר במערך הבקרה עטרה אלהרר atara@meuhedet.co.il.`
      ];
    });
    this.dataObject.printOption = PrintingOption.CLOSE_INVOICE;
    this.dataObject.lowerContent = [
      { desc: 'פרטי ספק ב SAP', value: '' },
      { desc: 'מספר ח.פ: ', value: 'TBD' },
      { desc: 'שם ספק: ', value: 'TBD' },
      { desc: 'קוד ספק: ', value: 'TBD' },
      { desc: 'חשבון בנק: ', value: 'TBD' }
    ];
    this.dataObject.dialogHeader = 'הדפסת דרישת תשלום';
    this.dataObject.displayedColumns = this.displayedColumns;
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }

  buildPrintObjectRows() {
    this.dataObject.mainHeader = 'ריכוז שורות לחשבונית';
    this.currentInvoice$.take(1).subscribe(inv => {
      this.dataObject.parentContent = [
        { view: `חשבונית מס:`, value: inv.invoiceNum },
        { view: `חודש:`, value: inv.billMonth },
        { view: `סטטוס:`, value: inv.status },
        { view: `סכום לא כולל מע"מ:`, value: inv.typedSum },
        { view: `אחוז מע"מ:`, value: inv.vatPer },
        { view: `סכום כולל מע"מ:`, value: inv.invoiceSum },
        { view: `הערות: `, value: inv.remark1 }
      ];
    });

    this.dataObject.printOption = PrintingOption.ROWS;
    this.dataObject.dialogHeader = 'הדפסת שורות לחשבוניות';
    this.dataObject.displayedColumns = this.displayedColumns;
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }

  buildPrintObjectSummary() {
    this.dataObject.mainHeader = 'סיכום חשבונית';
    this.currentInvoice$.take(1).subscribe(inv => {
      this.dataObject.parentContent = [
        { view: `חשבונית מס:`, value: inv.invoiceNum },
        { view: `חודש:`, value: inv.billMonth },
        { view: `סטטוס:`, value: inv.status },
        { view: `סכום לא כולל מע"מ:`, value: inv.typedSum },
        { view: `אחוז מע"מ:`, value: inv.vatPer },
        { view: `סכום כולל מע"מ:`, value: inv.invoiceSum },
        { view: `הערות: `, value: inv.remark1 }
      ];
    });

    this.dataObject.printOption = PrintingOption.SUMMARY;
    this.dataObject.dialogHeader = 'הדפסת סיכום חשבוניות';
    this.dataObject.displayedColumns = this.displayedColumns;
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }

  /*********************************************************  END ************************************************************/
}
