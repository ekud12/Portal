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
import { Invoice, PrintingOption, CardSwipeForSapak } from '../../models/class-models/objects.model';
import { InvoiceRowDatePipe } from '../../../../shared/utils/invoice-row-date.pipe';

@Component({
  selector: 'app-card-swipe-report',
  templateUrl: './card-swipe-report.component.html',
  styleUrls: ['./card-swipe-report.component.css']
})
export class CardSwipeReportComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'fullID',
    'fullName',
    'dateField',
    'timeField',
    'commitmentIdField',
    'treatmentCodeField',
    'executionCodeField',
    'remark2Field',
    'actions'
  ];
  displayedColumnsMap = [
    { value: 'fullID', viewValue: 'מספר זיהוי' },
    { value: 'fullName', viewValue: 'שם המבוטח' },
    { value: 'dateField', viewValue: 'תאריך' },
    { value: 'timeField', viewValue: 'שעה' },
    { value: 'commitmentIdField', viewValue: 'כמות טיפולים שדווחו' },
    { value: 'treatmentCodeField', viewValue: 'קוד טיפול' },
    { value: 'executionCodeField', viewValue: 'תקין' },
    { value: 'remark2Field', viewValue: 'סיבה' },
    { value: 'actions', viewValue: '' }
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
  cardSwipesForSapak$: Observable<CardSwipeForSapak[]>;
  isLoading$: Observable<boolean>;
  dataRequest$: Observable<SapakDataRequest>;
  searchObject = {
    fromDate: '',
    toDate: '',
    id: '',
    name: ''
  };

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
    this.cardSwipesForSapak$ = this.invoiceStore.select(fromInvoiceStore.cardSwipesSelector);
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
    this.dataRequest$.take(1).subscribe(val => {
      this.invoiceStore.dispatch(new fromInvoiceStore.GetCardSwipes(val));
    });
    this.cardSwipesForSapak$.subscribe(val => {
      this.dataSource = new MatTableDataSource<CardSwipeForSapak>(val);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.connect().value.sort((a, b) => {
        return (
          moment(b.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() - moment(a.dateField, 'YYYY-MM-DDTHH:mm:ss').valueOf() ||
          moment(b.dateField, 'HH:mm:ss').valueOf() - moment(a.dateField, 'HH:mm:ss').valueOf()
        );
      });
      this.dataSource.filterPredicate = (data: CardSwipeForSapak, filter: any) => {
        console.log(filter);
        return (
          data.fullID.toString().indexOf(filter.id) !== -1 &&
          data.fullName.indexOf(filter.name) !== -1 &&
          (data.dateField >= filter.fromDate && filter.toDate >= data.dateField)
        );
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
}
