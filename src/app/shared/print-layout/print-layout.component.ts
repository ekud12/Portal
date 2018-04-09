import { Component, OnInit, Input, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintObject } from '../global-models/print-object.interface';
import { MAT_DIALOG_DATA } from '@angular/material';

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
  data: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public incomingData: any, private router: Router, private route: ActivatedRoute) {
    this.object = incomingData;
    this.data = this.object.data;
  }

  ieBtn = false;
  returnURL = '';

  ngOnInit() {
    /** if ie get from state */
    this.route.queryParams.subscribe(params => {
      if (params.isIE) {
        this.ieBtn = true;
        this.returnURL = params.returnUrl;
        this.object = params.valObject;
      }
    });
    this.dataSource = new MyDataSource(this.dataSubject);
    this.dataSubject.next(this.data);
  }

  getViewValue(v) {
    return this.object.dismap.find(a => a.value === v).viewValue;
  }

  print() {
    window.print();
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
