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
import { Invoice, PrintingOption, InvoiceRow } from '../../models/class-models/objects.model';
import { InvoiceRowDatePipe } from '../../../../shared/utils/invoice-row-date.pipe';
import { ValidateAndCloseInvoiceComponent } from '../../utils/validate-and-close-invoice/validate-and-close-invoice.component';
import { ObligationsByCustomerIdRequest } from '../../models/requests-models/requests';

@Component({
  selector: 'app-invoice-rows',
  templateUrl: './invoice-rows.component.html',
  styleUrls: ['./invoice-rows.component.css']
})
export class InvoiceRowsComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'lineNumField',
    'commitmentIdField',
    'cstFormattedIdField',
    'custFirstNameField',
    'custSecNameField',
    'typedAmountField',
    'dateField',
    'amountField',
    'visitNumField',
    'actions'
  ];
  displayedColumnsMap = [
    { value: 'lineNumField', viewValue: 'מספר שורה' },
    { value: 'commitmentIdField', viewValue: 'מספר התחייבות' },
    { value: 'cstFormattedIdField', viewValue: 'מספר זיהוי' },
    { value: 'custFirstNameField', viewValue: 'שם פרטי' },
    { value: 'custSecNameField', viewValue: 'שם משפחה' },
    { value: 'typedAmountField', viewValue: 'סכום' },
    { value: 'dateField', viewValue: 'תאריך' },
    { value: 'amountField', viewValue: 'מספר טיפולים' },
    { value: 'visitNumField', viewValue: 'מספר ביקור' },
    { value: 'actions', viewValue: '' }
  ];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  /** Requests */
  obligationsByIdReq: ObligationsByCustomerIdRequest = { kodSapak: '', userName: '', custId: '', custIdType: '' };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userName: string;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  listOfInvoiceRows$: Observable<InvoiceRow[]>;
  currentInvoice$: Observable<Invoice>;
  errors$: Observable<any>;
  dataObject: PrintObject = new PrintObject();
  selectedFilter = this.displayedColumnsMap[1];
  dataSource;
  displayNoRecords = false;
  allowActionsByStatus = false;

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
      this.dataSource = new MatTableDataSource<InvoiceRow>(val);
    });
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    /** allow actions by invoice status... change with atara */
    this.currentInvoice$.subscribe(val => {
      if (val !== null && +val.statusField < 2) {
        this.allowActionsByStatus = true;
      } else {
        this.allowActionsByStatus = false;
      }
    });
    this.errors$ = this.invoiceStore.select(fromInvoiceStore.invoiceRowsErrorsSelector);
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
      /** Init Future Requests  */
      this.obligationsByIdReq.kodSapak = spk.kodSapak;
    });
    this.loggedUserName$.subscribe(username => (this.obligationsByIdReq.userName = username));

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

  activateInvoiceRow(row: any) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoiceRow(row));
    this.routerStore.dispatch(new Go({ path: ['/portal/invoices/treatments'] }));
  }

  createNewInvoiceRow() {
    this.currentInvoice$.take(1).subscribe(val => {
      if (val.statusField === '0' || val.statusField === '1') {
        this.routerStore.dispatch(new Go({ path: ['portal/invoices/newRow'] }));
      } else {
        this.toaster.openSnackBar('סטטוס חשבונית פעילה נוכחית לא מאפשר הוספת שורה חדשה.');
      }
    });
  }

  closeInvoice() {
    const dialogRef = this.dialog.open(ValidateAndCloseInvoiceComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /** add logic to close invoice and only than go to print */
        this.printData(5);
      }
    });
  }

  deleteRow(a: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { data: `האם למחוק את השורה הנוכחית(שורה מס' ${a.lineNum})?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleting row...');
        /** delete invoice row and call op 03 to get all invoice rows again */
      }
    });
  }

  openReportedTreatmentsForCommitment(row) {
    this.obligationsByIdReq.custId = '406';
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoiceRow(row));
    // TODO: Redirect to correct page
    // this.routerStore.dispatch(new Go({ path: ['/aa'] }));
  }

  openReportedTreatmentsForCustomer(row) {
    this.obligationsByIdReq.custIdType = '1';
    this.obligationsByIdReq.custId = '406';
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoiceRow(row));
    this.invoiceStore.dispatch(new fromInvoiceStore.GetObligationsByCustomerId(this.obligationsByIdReq));
    this.routerStore.dispatch(new Go({ path: ['/portal/invoices/obligationsbyid'], query: { returnUrl: this.router.url } }));
  }

  openKizuzDetailsForRow(row) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateInvoiceRow(row));
    // this.invoiceStore.dispatch(new fromInvoiceStore.GetObligationsByCustomerId(this.obligationsByIdReq));
    this.routerStore.dispatch(new Go({ path: ['/portal/invoices/kizuz'], query: { returnUrl: this.router.url } }));
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }

  /************************************************  PRINTING ****************************************************/
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
        `סכום חשבון לפני מע"מ: ${inv.typedSumField}.
         מע"מ: ${inv.vatPerField}.
         סכום חשבון כולל מע"מ: ${inv.invoiceSumField}.`,
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
