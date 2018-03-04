import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState, ChangeSapak } from '../store';

import * as fromUserStore from '../store';
import { User } from '../models/user.model';
import { Sapak } from '../models/sapak.model';
import { Go } from '../../../core/store';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent implements OnInit {
  user$: Observable<User>;
  activeSapak$: Observable<Sapak>;

  selectedSapakKod = '';

  constructor(private store: Store<UserState>) {
    this.user$ = store.select(fromUserStore.userSelector);
    this.activeSapak$ = store.select(fromUserStore.activeSapakSelector);
  }

  ngOnInit() {
    this.user$.subscribe(val => console.log(val));
    this.activeSapak$.subscribe(val => console.log(val));
  }

  changeActiveSapak() {
    this.store.dispatch(new ChangeSapak(this.selectedSapakKod));
    this.selectedSapakKod = '';
  }

  logoutUser() {
    this.store.dispatch(
      new Go({
        path: ['/login']
      })
    );
  }
}
