import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState, ChangeSapak } from '../store';

import * as fromUserStore from '../store';
import { User } from '../models/user.model';
import { Sapak } from '../models/sapak.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserPanelComponent implements OnInit {
  user$: Observable<User>;
  activeSapak$: Observable<Sapak>;

  selectedSapakKod = '';

  constructor(private store: Store<any>) {
    this.user$ = store.select(fromUserStore.userSelector);
    this.activeSapak$ = store.select(fromUserStore.activeSapakSelector);
  }

  ngOnInit() {
    // this.activeSapak$.subscribe(spk => (this.selectedSapak = spk));
  }

  changeActiveSapak() {
    this.store.dispatch(new ChangeSapak(this.selectedSapakKod));
    this.selectedSapakKod = '';
  }
}
