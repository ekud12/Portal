import { Component, OnInit, Input, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintObject } from '../global-models/print-object.interface';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
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

    if (this.object.isTableContent) {
      this.data = this.object.data;
      this.dataSource = new MyDataSource(this.dataSubject);
      this.dataSubject.next(this.data);
    }

    /** if ie get from state */
    this.route.queryParams.subscribe(params => {
      // this.ieBtn = true;
      this.returnURL = params.returnUrl;
      // this.object = params.valObject;
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
