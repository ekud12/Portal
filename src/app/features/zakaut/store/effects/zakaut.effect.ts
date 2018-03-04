import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';

@Injectable()
export class ZakautEffects {
  constructor(private actions$: Actions) {}

}
