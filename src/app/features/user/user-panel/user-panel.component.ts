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

  SapakTreatmentsRequest: SapakTreatmentsRequest;
  selectedSapakKod = '';

  constructor(private store: Store<UserState>, public snackBar: MatSnackBar) {
    this.user$ = store.select(fromUserStore.userSelector);
    this.activeSapak$ = store.select(fromUserStore.activeSapakSelector);
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
    this.activeSapak$.take(1).subscribe(val => this.openSnackBar(`קוד ספק פעיל שונה ל warning: ${val.kodSapak}`, null));
  }

  logoutUser() {
    this.store.dispatch(new fromUserStore.UserLogout());
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      direction: 'rtl',
      panelClass: 'snack-item'
    });
  }
}
