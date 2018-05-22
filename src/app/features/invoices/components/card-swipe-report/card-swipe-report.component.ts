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
  cardSwipesForSapak$: Observable<CardSwipeForSapak[]>;
  isLoading$: Observable<boolean>;
  dataRequest$: Observable<SapakDataRequest>;

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
    this.cardSwipesForSapak$.subscribe(val => {
      this.dataSource = new MatTableDataSource<CardSwipeForSapak>(val);
    });
    this.dataRequest$ = this.userStore.select(fromUserStore.userNameAndCurrentSapakSelector);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1);
  }

  ngOnInit() {
    this.dataRequest$.take(1).subscribe(val => {
      this.invoiceStore.dispatch(new fromInvoiceStore.GetCardSwipes(val));
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

  getViewValue(v) {
    return this.displayedColumnsMap.find(a => a.value === v).viewValue;
  }
}
