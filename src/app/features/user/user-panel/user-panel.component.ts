import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Sapak, SapakDataRequest } from '../models/sapak.model';
import { User } from '../models/user.model';
import { ChangeSapak, UserState } from '../store';
import * as fromUserStore from '../store';

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
  userLoader$: Observable<boolean>;
  SapakTreatmentsRequest: SapakDataRequest;
  selectedSapakKod = '';

  constructor(private store: Store<UserState>) {
    this.user$ = store.select(fromUserStore.userSelector);
    this.activeSapak$ = store.select(fromUserStore.activeSapakSelector);
    this.userLoader$ = store.select(fromUserStore.userLoadingSelector);
  }

  ngOnInit() {
    this.SapakTreatmentsRequest = new SapakDataRequest('', '');
    this.user$.subscribe(val => {
      this.SapakTreatmentsRequest.userName = val.username;
    });
  }

  changeActiveSapak() {
    this.SapakTreatmentsRequest.kodSapak = this.selectedSapakKod;
    this.store.dispatch(new ChangeSapak(this.SapakTreatmentsRequest));
    this.selectedSapakKod = '';
  }

  logoutUser() {
    this.store.dispatch(new fromUserStore.UserLogout());
  }
}
