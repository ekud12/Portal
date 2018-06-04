import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import { Go } from '@coreStore';
import { httpRoutes } from '@http-routes';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { ToastService } from 'app/core/services/toast-service.service';
import { Observable } from 'rxjs/Observable';
import { AlertDialogComponent } from '../../../../shared/alert-dialog/alert-dialog.component';
import { FileUploadComponent } from '../../../../shared/file-upload/file-upload.component';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import { Invoice, InvoiceRow, InvoiceTreatment } from '../../models/class-models/objects.model';
import {
  DeleteTreatmentForRowRequest,
  UpdateInvoiceRowRequest,
  UpdatedRowInputFromUser
} from '../../models/requests-models/requests';

@Component({
  selector: 'app-invoice-row-treatments',
  templateUrl: './invoice-row-treatments.component.html',
  styleUrls: ['./invoice-row-treatments.component.css'],
  providers: [DatePipe]
})
export class InvoiceRowTreatmentsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('updateRowFormTag') myForm;

  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  /**
   * Observables for Store
   */
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  listOfTreatmentsForRow$: Observable<InvoiceTreatment[]>;
  currentInvoice$: Observable<Invoice>;
  currentInvoiceRow$: Observable<InvoiceRow>;
  dataRequest$: Observable<SapakDataRequest>;
  canActivate$: Observable<boolean>;

  /**
   * Special Local Objects and Requests
   */
  dataObject: PrintObject = new PrintObject();
  tempUpdateRowRequest: UpdatedRowInputFromUser = new UpdatedRowInputFromUser();
  updateRowRequest: UpdateInvoiceRowRequest = new UpdateInvoiceRowRequest();
  deleteTreatmentForRowRequest: DeleteTreatmentForRowRequest = new DeleteTreatmentForRowRequest();

  /**
   * Material Table parameters
   */
  dataSource;
  displayedColumns = [
    'treatmentCodeField',
    'treatmentDescField',
    'dateField',
    'treatmentNumField',
    'typedAmount2Field',
    'actions'
  ];
  displayedColumnsMap = [
    { value: 'treatmentCodeField', viewValue: 'קוד טיפול' },
    { value: 'treatmentDescField', viewValue: 'תיאור טיפול' },
    { value: 'dateField', viewValue: 'תאריך' },
    { value: 'treatmentNumField', viewValue: 'כמות' },
    { value: 'typedAmount2Field', viewValue: 'מחיר' },
    { value: 'actions', viewValue: '' }
  ];
  selectedFilter = this.displayedColumnsMap[1];

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>,
    public dialog: MatDialog,
    private toaster: ToastService,
    private datePipe: DatePipe
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.listOfTreatmentsForRow$ = this.invoiceStore.select(fromInvoiceStore.allTreatmentsForRowSelector);
    this.currentInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    this.dataRequest$ = this.userStore.select(fromUserStore.userNameAndCurrentSapakSelector);
    this.canActivate$ = this.invoiceStore.select(fromInvoiceStore.canDoActionsForInvoiceSelector);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1);
  }

  ngOnInit() {
    this.getAllTreatmentsForInvoiceRow();
    this.initFutureRequests();
    this.listOfTreatmentsForRow$.subscribe(val => {
      if (val !== null) {
        this.dataSource = new MatTableDataSource<InvoiceTreatment>(val);
      } else {
        this.dataSource = new MatTableDataSource<InvoiceTreatment>([]);
      }
    });
  }

  filterData(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  initFutureRequests() {
    this.loggedUserName$.subscribe(username => {
      this.updateRowRequest.userName = username;
      this.deleteTreatmentForRowRequest.userName = username;
    });
    this.currentSapak$.subscribe(spk => {
      this.dataObject.headerDetailsValue1 = spk.kodSapak;
      this.dataObject.headerDetailsValue2 = spk.description;
      this.deleteTreatmentForRowRequest.kodSapak = spk.kodSapak;
      this.updateRowRequest.kodSapak = spk.kodSapak;
    });
    this.currentInvoice$.subscribe(val => {
      if (val !== null) {
        this.updateRowRequest.invoiceNum = val.invoiceNumField;
        this.updateRowRequest.billMonth = val.billMonthField;
        this.updateRowRequest.billMonth = val.billMonthField;
        this.deleteTreatmentForRowRequest.invoiceNum = val.invoiceNumField;
        this.deleteTreatmentForRowRequest.billMonth = val.billMonthField;
      }
    });
    this.currentInvoiceRow$.subscribe(val => {
      if (val !== null) {
        this.updateRowRequest.rowNum = val.lineNumField;
        this.updateRowRequest.custId = val.custIdField;
        this.updateRowRequest.custIdType = val.custIdTypeField;
        this.updateRowRequest.commitmentId = val.commitmentIdField;
        this.updateRowRequest.visitNum = val.visitNumField;
        this.updateRowRequest.date = val.dateField;
        this.tempUpdateRowRequest.custIdType = val.custIdTypeField;
        this.tempUpdateRowRequest.custId = val.custIdField;
        this.tempUpdateRowRequest.commitment = val.commitmentIdField;
        this.tempUpdateRowRequest.visitNum = val.visitNumField;
        this.deleteTreatmentForRowRequest.commitmentId = val.commitmentIdField;
        this.deleteTreatmentForRowRequest.invoiceRow = val.lineNumField;
        this.deleteTreatmentForRowRequest.typedObligationAmount = val.lineNumField;
      }
    });
  }

  getAllTreatmentsForInvoiceRow() {
    this.dataRequest$.take(1).subscribe(val => {
      this.currentInvoice$.take(1).subscribe(inv => {
        val.invoice = inv;
      });
      this.currentInvoiceRow$.take(1).subscribe(row => {
        val.invoiceRow = row;
      });
      this.invoiceStore.dispatch(new fromInvoiceStore.GetTreatmentsForRow(val));
    });
  }

  activateTreatment(treat: InvoiceTreatment) {
    this.invoiceStore.dispatch(new fromInvoiceStore.ActivateTreatment(treat));
  }
  updateRow(row: InvoiceRow) {
    this.updateRowRequest.custIdType = this.tempUpdateRowRequest.custIdType;
    this.updateRowRequest.custId = this.tempUpdateRowRequest.custId;
    this.updateRowRequest.visitNum = this.tempUpdateRowRequest.visitNum;
    this.updateRowRequest.commitmentId = this.tempUpdateRowRequest.commitment;
    this.invoiceStore.dispatch(new fromInvoiceStore.UpdateInvoiceRow(this.updateRowRequest));
  }

  uploadSummary() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '40%',
      height: '400px'
    });
    const instance = dialogRef.componentInstance;
    instance.title = 'טעינת סיכום ביקור';
    instance.fileUploadEndpointInput = httpRoutes.FILES_UPLOAD_SUMMARY;
    instance.allowedContentTypesInput = [
      'application/pdf',
      'application/x-pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    instance.maxFilesizeAllowed = 4194304;
    instance.successMsg = 'סיכום ביקור נטען בהצלחה.';
  }

  addTreatment() {
    this.routerStore.dispatch(new Go({ path: ['portal/invoices/newTreatment'], query: { returnUrl: this.router.url } }));
  }

  deleteTreatment(treatRow: InvoiceTreatment) {
    // this.invoiceStore.dispatch(new fromInvoiceStore.ActivateTreatment(treatRow));
    this.deleteTreatmentForRowRequest.invoiceRow = treatRow.lineNumField;
    this.deleteTreatmentForRowRequest.treatCode = treatRow.treatmentCodeField;
    this.deleteTreatmentForRowRequest.treatCount = treatRow.treatmentNumField;
    this.deleteTreatmentForRowRequest.date = treatRow.dateField;
    this.deleteTreatmentForRowRequest.treatmentRowNum = treatRow.treatmentRowNumField;
    this.deleteTreatmentForRowRequest.typedObligationAmount = treatRow.typedAmount2Field;
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { data: `האם למחוק את הטיפול?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invoiceStore.dispatch(new fromInvoiceStore.DeleteTreatmentForInvoiceRow(this.deleteTreatmentForRowRequest));
      } else {
      }
    });
  }

  duplicateTreatment(treatRow: InvoiceTreatment) {
    this.activateTreatment(treatRow);
    // this.deleteTreatmentForRowRequest.invoiceRow = treatRow.lineNumField;
    // /** add per request */
    // const dialogRef = this.dialog.open(AlertDialogComponent, {
    //   data: { data: `האם למחוק את השורה הנוכחית(שורה מס' ${treatRow.lineNumField})?` }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // this.invoiceStore.dispatch(new fromInvoiceStore.DeleteInvoiceRow(this.deleteTreatmentForRowRequest));
    //     // this.getAllInvoiceRows();
    //   } else {
    //   }
    // });
  }

  updateTreatment(treatRow: InvoiceTreatment) {
    this.activateTreatment(treatRow);
    // this.deleteTreatmentForRowRequest.invoiceRow = treatRow.lineNumField;
    // /** add per request */
    // const dialogRef = this.dialog.open(AlertDialogComponent, {
    //   data: { data: `האם למחוק את השורה הנוכחית(שורה מס' ${treatRow.lineNumField})?` }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // this.invoiceStore.dispatch(new fromInvoiceStore.DeleteInvoiceRow(this.deleteTreatmentForRowRequest));
    //     // this.getAllInvoiceRows();
    //   } else {
    //   }
    // });
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }
}
