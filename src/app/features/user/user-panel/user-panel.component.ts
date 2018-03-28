import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState, ChangeSapak } from '../store';

import * as fromUserStore from '../store';
import { User } from '../models/user.model';
import { Sapak, SapakTreatmentsRequest } from '../models/sapak.model';
import { Go } from '../../../core/store';
import { MatSnackBar } from '@angular/material';

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
  SapakTreatmentsRequest: SapakTreatmentsRequest;
  selectedSapakKod = '';

  constructor(private store: Store<UserState>) {
    this.user$ = store.select(fromUserStore.userSelector);
    this.activeSapak$ = store.select(fromUserStore.activeSapakSelector);
    this.userLoader$ = store.select(fromUserStore.userLoadingSelector);
  }

  ngOnInit() {
    this.SapakTreatmentsRequest = new SapakTreatmentsRequest('', '');
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

// this.userLoaderStatus$.subscribe(show => {
//   if (show) {
//     if (this.timer) {
//       return;
//     }
//     this.timer = setTimeout(() => {
//       this.timer = null;
//       this.isLoading = true;
//     }, 2000);
//   } else {
//     if (this.timer) {
//       clearTimeout(this.timer);
//       this.timer = null;
//     }
//     this.isLoading = false;
//   }
// });
