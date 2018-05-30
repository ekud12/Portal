import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { ToastService } from 'app/core/services/toast-service.service';
import { Go } from 'app/core/store/actions';
import { AlertDialogComponent } from 'app/shared/alert-dialog/alert-dialog.component';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import {
  Invoice,
  PrintingOption,
  CardSwipeForSapak,
  ObligationByCustomerId,
  InvoiceRow
} from '../../models/class-models/objects.model';
import { InvoiceRowDatePipe } from '../../../../shared/utils/invoice-row-date.pipe';

@Component({
  selector: 'app-obligations-by-cust-id-report',
  templateUrl: './obligations-by-cust-id-report.component.html',
  styleUrls: ['./obligations-by-cust-id-report.component.css']
})
export class ObligationsByCustIdReportComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'yearBillMonthField',
    'invoiceNumField',
    'rowNumField',
    'obligationNumField',
    'dateField',
    'treatmentCodeField',
    'treatmentDescField',
    'treatmentNumField',
    'obligationAmount2Field'
  ];
  displayedColumnsMap = [
    { value: 'yearBillMonthField', viewValue: 'חודש' },
    { value: 'invoiceNumField', viewValue: 'מס חשבונית' },
    { value: 'rowNumField', viewValue: 'מספר שורה' },
    { value: 'obligationNumField', viewValue: 'התחייבות' },
    { value: 'dateField', viewValue: 'תאריך' },
    { value: 'treatmentCodeField', viewValue: 'קוד טיפול' },
    { value: 'treatmentDescField', viewValue: 'תאור טיפול' },
    { value: 'treatmentNumField', viewValue: 'מספר טיפולים' },
    { value: 'obligationAmount2Field', viewValue: 'סכום' }
  ];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  obligationsByCustomerId$: Observable<ObligationByCustomerId[]>;
  activeInvoiceRow$: Observable<InvoiceRow>;
  isLoading$: Observable<boolean>;
  dataSource;
  displayNoRecords = false;
  returnURL;
  errors$: Observable<any>;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.obligationsByCustomerId$ = this.invoiceStore.select(fromInvoiceStore.obligationsByCustomerIdSelector);
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.miscLoadingSelector);
    this.activeInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
    this.errors$ = this.invoiceStore.select(fromInvoiceStore.miscErrorsSelector);

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  ngOnInit() {
    this.obligationsByCustomerId$.subscribe(val => {
      this.dataSource = new MatTableDataSource<ObligationByCustomerId>(val);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      /** Sorting */
      this.dataSource.connect().value.sort((a, b) => {
        return (
          moment(a.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() - moment(b.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() &&
          +b.invoiceNumField > +a.invoiceNumField &&
          +a.rowNumField > +b.rowNumField
        );
      });
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnURL = params.returnUrl;
    });
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }

  goBack() {
    this.router.navigateByUrl(this.returnURL);
  }
}
