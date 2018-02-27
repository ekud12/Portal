import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../store';

import * as fromUserStore from '../store';
import { Sapak } from '../models/sapak';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserPanelComponent implements OnInit {
  userName$: Observable<string>;
  activeSapak$: Observable<Sapak>;
  availableSapakim$: Observable<Sapak[]>;

  constructor(private store: Store<any>) {
    this.userName$ = store.select(fromUserStore.userSelector);
    this.availableSapakim$ = store.select(fromUserStore.sapakimSelector);
    this.activeSapak$ = store.select(fromUserStore.activeSapakSelector);
  }

  ngOnInit() {}
}
