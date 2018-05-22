import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { ToastService } from 'app/core/services/toast-service.service';
import { Go } from 'app/core/store/actions';
import { AlertDialogComponent } from 'app/shared/alert-dialog/alert-dialog.component';
import { Observable } from 'rxjs/Observable';

import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak } from '../../../user/models/sapak.model';
import { Invoice, PrintingOption } from '../../models/new-actions.model';
import { InvoiceRowDatePipe } from '../../../../shared/utils/invoice-row-date.pipe';

@Component({
  selector: 'app-card-swipe-report',
  templateUrl: './card-swipe-report.component.html',
  styleUrls: ['./card-swipe-report.component.css']
})
export class CardSwipeReportComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'lineNum',
    'commitmentId',
    'cstFormattedId',
    'custFirstName',
    'custSecName',
    'typedAmount',
    'date',
    'amount',
    'visitNum',
    'actions'
  ];
  displayedColumnsMap = [
    { value: 'lineNum', viewValue: 'מספר זיהוי' },
    { value: 'commitmentId', viewValue: 'שם המבוטח' },
    { value: 'cstFormattedId', viewValue: 'תאריך' },
    { value: 'custFirstName', viewValue: 'שעה' },
    { value: 'custSecName', viewValue: 'כמות טיפולים שדווחו' },
    { value: 'typedAmount', viewValue: 'קוד טיפול' },
    { value: 'date', viewValue: 'תקין' },
    { value: 'amount', viewValue: 'סיבה' },
    { value: 'actions', viewValue: 'פרטים נוספים' }
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
  listOfInvoiceRows$: Observable<Invoice[]>;
  currentInvoice$: Observable<Invoice>;

  dataObject: PrintObject = new PrintObject();
  selectedFilter = this.displayedColumnsMap[1];
  dataSource;
  displayNoRecords = false;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>,
    public dialog: MatDialog,
    private toaster: ToastService,
    private dateFormatter: InvoiceRowDatePipe
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.listOfInvoiceRows$ = this.invoiceStore.select(fromInvoiceStore.allInvoiceRowsSelector);
    this.listOfInvoiceRows$.subscribe(val => {
      this.dataSource = new MatTableDataSource<Invoice>(val);
    });
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
  }

  ngAfterViewInit() {
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

  filterData(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.filteredData.length === 0) {
      this.displayNoRecords = true;
    } else {
      this.displayNoRecords = false;
    }
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
    this.routerStore.dispatch(new Go({ path: ['print'], query: { isIE: true, returnUrl: this.router.url } }));
  }

  activateInvoiceRow(row: any) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoiceRow(row));
  }

  createNewInvoiceRow() {
    this.currentInvoice$.take(1).subscribe(val => {
      if (val.statusField === '0' || val.statusField === '1') {
        this.routerStore.dispatch(new Go({ path: ['portal/invoices/newRow'] }));
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

  deleteRow(a: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { data: 'האם למחוק את השורה הנוכחית?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /** delete invoice row and call op 03 to get all invoice rows again */
      }
    });
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }

  /************************************************  BUILD OBJECTS FOR PRINTING ****************************************************/
  buildPrintObjectCloseInvoice() {
    this.currentInvoice$.take(1).subscribe(inv => {
      this.dataObject.mainHeader = `דרישת תשלום מספר ${inv.invoiceNumField} לחודש ${this.dateFormatter.transform(
        inv.billMonthField,
        'billMonthField'
      )}.`;
      this.dataObject.specialData = [
        `הננו מתכבדים להגיש דרישת תשלום מספר: ${
          inv.invoiceNumField
        } בגין השירותים שסיפקנו ללקוחות מאוחדת בחודש ${this.dateFormatter.transform(inv.billMonthField, 'billMonthField')}.`,
        `סכום חשבון לפני מע"מ: ${inv.typedSumField}.  מע"מ: ${inv.vatPerField},    סכום חשבון כולל מע"מ: ${inv.invoiceSumField}.`,
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
        { view: `חשבונית מס:`, value: inv.invoiceNumField },
        { view: `חודש:`, value: inv.billMonthField },
        { view: `סטטוס:`, value: inv.statusField },
        { view: `סכום לא כולל מע"מ:`, value: inv.typedSumField },
        { view: `אחוז מע"מ:`, value: inv.vatPerField },
        { view: `סכום כולל מע"מ:`, value: inv.invoiceSumField },
        { view: `הערות: `, value: inv.remark1Field }
      ];
    });

    this.dataObject.printOption = PrintingOption.ROWS;
    this.dataObject.dialogHeader = 'הדפסת שורות לחשבוניות';
    this.dataObject.displayedColumns = this.displayedColumns;
    this.dataObject.dismap = this.displayedColumnsMap;
    this.dataObject.data = this.dataSource.connect().value;
  }

  buildPrintObjectSummary() {
    this.dataObject.mainHeader = '';
    this.currentInvoice$.take(1).subscribe(inv => {
      this.dataObject.parentContent = [
        { view: `חשבונית מס:`, value: inv.invoiceNumField },
        { view: `חודש:`, value: inv.billMonthField },
        { view: `סטטוס:`, value: inv.statusField },
        { view: `סכום לא כולל מע"מ:`, value: inv.typedSumField },
        { view: `אחוז מע"מ:`, value: inv.vatPerField },
        { view: `סכום כולל מע"מ:`, value: inv.invoiceSumField },
        { view: `הערות: `, value: inv.remark1Field }
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
