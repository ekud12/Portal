import { Injectable } from '@angular/core';
import { LoginModel, LoginResponse } from './models/login.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from './models/user.model';
import { catchError, map } from 'rxjs/operators';
import { BackendService } from '../../core/services/backend.service';

import { httpRoutes } from '@http-routes';
import { SapakTreatmentsRequest, SapakTreatmentsListResponse } from './models/sapak.model';

@Injectable()
export class UserService {
  constructor(private backendService: BackendService) {}

  login(loginDetails: LoginModel): Observable<any> {
    return this.backendService.post<LoginResponse>(httpRoutes.LOGIN, loginDetails);
  }

  getTreatmentsForSapak(model: SapakTreatmentsRequest): Observable<any> {
    console.log(model);
    return this.backendService.post<SapakTreatmentsListResponse>(httpRoutes.TREATMENTS_API, model);
    // return of('1');
  }
}
