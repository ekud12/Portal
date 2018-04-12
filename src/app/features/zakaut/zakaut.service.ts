import { Injectable } from '@angular/core';
import { httpRoutes } from '@http-routes';
import { Observable } from 'rxjs/Observable';

import { BackendService } from '../../core/services/backend.service';
import { ZakautQueryModel } from './models/zakaut-query.model';

@Injectable()
export class ZakautService {
  constructor(private backendService: BackendService) {}

  checkZakaut(request: ZakautQueryModel): Observable<any> {
    return this.backendService.post<ZakautQueryModel>(httpRoutes.ZAKAUT_API, request);
  }
}
