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
import { Sapak } from '../../../user/models/sapak.model';
import { Invoice, InvoiceRow } from '../../models/class-models/objects.model';
import { RowUpdateRequest } from '../../models/requests-models/requests';

@Component({
  selector: 'app-invoice-row-treatments',
  templateUrl: './invoice-row-treatments.component.html',
  styleUrls: ['./invoice-row-treatments.component.css']
})
export class InvoiceRowTreatmentsComponent implements OnInit, AfterViewInit {
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
    { value: 'lineNum', viewValue: 'מספר שורה' },
    { value: 'commitmentId', viewValue: 'מספר התחייבות' },
    { value: 'cstFormattedId', viewValue: 'מספר זיהוי' },
    { value: 'custFirstName', viewValue: 'שם פרטי' },
    { value: 'custSecName', viewValue: 'שם משפחה' },
    { value: 'typedAmount', viewValue: 'סכום' },
    { value: 'date', viewValue: 'תאריך' },
    { value: 'amount', viewValue: 'מספר טיפולים' },
    { value: 'visitNum', viewValue: 'מספר ביקור' },
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
  listOfInvoiceRows$: Observable<InvoiceRow[]>;
  currentInvoice$: Observable<Invoice>;
  currentInvoiceRow$: Observable<InvoiceRow>;
  dataObject: PrintObject = new PrintObject();
  selectedFilter = this.displayedColumnsMap[1];
  dataSource;
  rowUpdateRequest = new RowUpdateRequest();

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
    this.listOfInvoiceRows$ = this.invoiceStore.select(fromInvoiceStore.allInvoiceRowsSelector);
    this.listOfInvoiceRows$.subscribe(val => {
      this.dataSource = new MatTableDataSource<InvoiceRow>(val);
    });
    this.currentInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
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
    this.currentInvoice$.subscribe(val => {});

    this.dataSource.filterPredicate = (data: Element, filter: string) =>
      data[this.selectedFilter.value].toString().includes(filter) || filter === 'all';
  }

  filterData(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }
}
