import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../store';

import * as fromUserStore from '../store';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserPanelComponent implements OnInit {
  user$: Observable<string>;
  version$: Observable<string>;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  constructor(private store: Store<any>) {
    this.user$ = store.select(fromUserStore.selector);
  }

  ngOnInit() {}
}
