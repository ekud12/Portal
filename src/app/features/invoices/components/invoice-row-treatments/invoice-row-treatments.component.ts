import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import { httpRoutes } from '@http-routes';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { ToastService } from 'app/core/services/toast-service.service';
import { Observable } from 'rxjs/Observable';
import { FileUploadComponent } from '../../../../shared/file-upload/file-upload.component';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import { Invoice, InvoiceRow, InvoiceTreatment } from '../../models/class-models/objects.model';
import { RowUpdateRequest } from '../../models/requests-models/requests';

@Component({
  selector: 'app-invoice-row-treatments',
  templateUrl: './invoice-row-treatments.component.html',
  styleUrls: ['./invoice-row-treatments.component.css']
})
export class InvoiceRowTreatmentsComponent implements OnInit, AfterViewInit {
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
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('updateRowFormTag') myForm;

  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  listOfTreatmentsForRow$: Observable<InvoiceTreatment[]>;
  currentInvoice$: Observable<Invoice>;
  currentInvoiceRow$: Observable<InvoiceRow>;
  dataObject: PrintObject = new PrintObject();
  selectedFilter = this.displayedColumnsMap[1];
  dataSource;
  rowUpdateRequest = new RowUpdateRequest();
  dataRequest$: Observable<SapakDataRequest>;
  canActivate$: Observable<boolean>;
  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private sharedStore: Store<fromSharedStore.SharedState>,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>,
    public dialog: MatDialog,
    private toaster: ToastService
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
    /** TO allow content to load while building the view  */
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1);
  }

  ngOnInit() {
    this.getAllTreatmentsForInvoiceRow();

    this.currentSapak$.subscribe(spk => {
      this.dataObject.headerDetailsValue1 = spk.kodSapak;
      this.dataObject.headerDetailsValue2 = spk.description;
    });
    this.currentInvoice$.subscribe(val => {});
    this.listOfTreatmentsForRow$.subscribe(val => {
      this.dataSource = new MatTableDataSource<InvoiceTreatment>(val);
    });
    this.dataSource.filterPredicate = (data: Element, filter: string) =>
      data[this.selectedFilter.value].toString().includes(filter) || filter === 'all';
  }

  filterData(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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

  updateRow() {}
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
  }

  addNewTreatments() {}

  // deleteTreatments(a: any) {
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     data: { data: 'האם למחוק את השורה הנוכחית?' }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       /** delete invoice row and call op 03 to get all invoice rows again */
  //     }
  //   });
  // }

  addTreatment() {}
  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }
}
