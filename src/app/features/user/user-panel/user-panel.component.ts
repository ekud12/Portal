import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../store';

import * as fromUserStore from '../store';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  user$: Observable<string>;
  version$: Observable<string>;

  constructor(private store: Store<any>) {
    this.user$ = store.select(fromUserStore.selector);
  }

  ngOnInit() {}
}
