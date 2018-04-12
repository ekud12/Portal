import { Injectable } from '@angular/core';
import { httpRoutes } from '@http-routes';
import { Observable } from 'rxjs/Observable';

import { BackendService } from '../../core/services/backend.service';
import { LoginModel, LoginResponse } from './models/login.model';
import { SapakDataRequest, SapakTreatmentsListResponse } from './models/sapak.model';

@Injectable()
export class UserService {
  constructor(private backendService: BackendService) {}

  login(loginDetails: LoginModel): Observable<any> {
    return this.backendService.post<LoginResponse>(httpRoutes.LOGIN, loginDetails);
  }

  getTreatmentsForSapak(model: SapakDataRequest): Observable<any> {
    return this.backendService.post<SapakTreatmentsListResponse>(httpRoutes.TREATMENTS_FOR_SAPAK_EP, model);
  }
}
