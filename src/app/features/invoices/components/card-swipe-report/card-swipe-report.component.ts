import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import { CardSwipeForSapak } from '../../models/class-models/objects.model';

@Component({
  selector: 'app-card-swipe-report',
  templateUrl: './card-swipe-report.component.html',
  styleUrls: ['./card-swipe-report.component.css']
})
export class CardSwipeReportComponent implements OnInit {
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
    this.cardSwipesForSapak$ = this.invoiceStore.select(fromInvoiceStore.cardSwipesSelector);
    this.dataRequest$ = this.userStore.select(fromUserStore.userNameAndCurrentSapakSelector);
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.miscLoadingSelector);
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
}
