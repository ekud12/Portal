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
import * as moment from 'moment';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import { Invoice, PrintingOption, CardSwipeForSapak, ObligationByCustomerId } from '../../models/class-models/objects.model';
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
  userName: string;
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  obligationsByCustomerId$: Observable<ObligationByCustomerId[]>;
  isLoading$: Observable<boolean>;
  dataRequest$: Observable<SapakDataRequest>;
  searchObject = {
    fromDate: '',
    toDate: '',
    id: '',
    name: ''
  };
  minDate = '';
  dynamicMin;
  maxDate = new Date();
  fromMinimalValue;
  selectedFilter = this.displayedColumnsMap[1];
  dataSource;
  displayNoRecords = false;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.obligationsByCustomerId$ = this.invoiceStore.select(fromInvoiceStore.obligationsByCustomerIdSelector);
    this.dataRequest$ = this.userStore.select(fromUserStore.userNameAndCurrentSapakSelector);
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.miscLoadingSelector);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  ngOnInit() {
    // this.dataRequest$.take(1).subscribe(val => {
    //   this.invoiceStore.dispatch(new fromInvoiceStore.GetCardSwipes(val));
    // });
    this.obligationsByCustomerId$.subscribe(val => {
      this.dataSource = new MatTableDataSource<ObligationByCustomerId>(val);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.connect().value.sort((a, b) => {
        return (
          moment(b.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() - moment(a.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() ||
          moment(b.dateField, 'HH:mm:ss').valueOf() - moment(a.dateField, 'HH:mm:ss').valueOf()
        );
      });
      this.dataSource.filterPredicate = (data: CardSwipeForSapak, filter: any) => {
        const matchFilter = [];
        matchFilter.push(data.fullID.includes(filter.id));
        matchFilter.push(data.fullName.includes(filter.name));
        if (filter.fromDate !== '') {
          matchFilter.push(Date.parse(data.dateField).valueOf() >= Date.parse(filter.fromDate).valueOf());
        }
        if (filter.toDate !== '') {
          matchFilter.push(Date.parse(filter.toDate).valueOf() >= Date.parse(data.dateField).valueOf());
        }
        return matchFilter.every(Boolean);
      };
    });
  }

  filterData(searchControl: string, filterValue: string) {
    if (searchControl !== 'fromDate' && searchControl !== 'toDate') {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
    } else {
      filterValue = moment(filterValue)
        .format('YYYY-MM-DDTHH:mm:ss')
        .toString();
    }

    switch (searchControl) {
      case 'id':
        this.searchObject.id = filterValue;
        break;
      case 'name':
        this.searchObject.name = filterValue;
        break;
      case 'fromDate':
        this.searchObject.fromDate = filterValue;
        this.dynamicMin = new Date(filterValue);
        break;
      case 'toDate':
        this.searchObject.toDate = filterValue;
        break;
      default:
        break;
    }
    this.dataSource.filter = this.searchObject;
    if (this.dataSource.filteredData.length === 0) {
      this.displayNoRecords = true;
    } else {
      this.displayNoRecords = false;
    }
  }

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }

  changeMinDate(value) {
    console.log(value);
    console.log(Date.parse(value));
  }
}
