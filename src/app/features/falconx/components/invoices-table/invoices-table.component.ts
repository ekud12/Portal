import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { PageNotFoundComponent } from '../../../../shared/page-not-found/page-not-found.component';

export interface Element {
  id: string;
  date: string;
  name: string;
  symbol: string;
  type: number;
}

const ELEMENT_DATA: Element[] = [
  { id: '1', name: 'Hydrogen', date: '17/12/2018', symbol: 'H', type: 1 },
  { id: '2', name: 'Hydrogen', date: '17/12/2018', symbol: 'H', type: 1 },
  { id: '3', name: 'Hydrogen', date: '17/12/2018', symbol: 'H', type: 1 },
  { id: '5', name: 'Hydrogen', date: '17/12/2018', symbol: 'H', type: 1 },
  { id: '8888', name: 'Hydrogen', date: '17/12/2018', symbol: 'H', type: 1 }
];

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.css']
})
export class InvoicesTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'date', 'symbol', 'type'];
  events: string[] = [];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {}
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.dataSource.filterPredicate = (data: Element, filter: string) => data.id.includes(filter) || filter === 'all';
  }

  openDialog(): void {
    this.dialog.open(PageNotFoundComponent, {
      width: '250px'
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  applyFilterInvoiceNumber(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
