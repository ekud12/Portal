import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { PrintObject } from '../global-models/print-object.interface';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {
  date = new Date().toLocaleString('he', { hour12: false });
  dataSource: MyDataSource;
  dataSubject = new BehaviorSubject<any[]>([]);
  object: PrintObject = new PrintObject();
  object$: Observable<any>;
  data: any[];

  constructor(private router: Router, private route: ActivatedRoute, private sharedStore: Store<fromSharedStore.SharedState>) {}

  ieBtn = false;
  returnURL = '';

  ngOnInit() {
    this.object$ = this.sharedStore.select(fromSharedStore.currentPrintObjectSelector);
    this.object$.subscribe(val => {
      this.object = val;
    });

    if (this.object.printOption) {
      this.data = this.object.data;
      this.dataSource = new MyDataSource(this.dataSubject);
      this.dataSubject.next(this.data);
    }

    /** if ie get from state */
    this.route.queryParams.subscribe(params => {
      this.returnURL = params.returnUrl;
    });
  }

  getViewValue(v) {
    return this.object.dismap.find(a => a.value === v).viewValue;
  }

  print() {
    window.print();
  }

  goBack() {
    this.sharedStore.dispatch(new fromSharedStore.ResetPrintData());
    this.router.navigateByUrl(this.returnURL);
  }
}

export class MyDataSource extends DataSource<any[]> {
  constructor(private subject: BehaviorSubject<any[]>) {
    super();
  }
  connect(): Observable<any[]> {
    return this.subject.asObservable();
  }
  disconnect(): void {}
}
