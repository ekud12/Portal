import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {
  baseUrl: string;
  tokenBaseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.http.baseUrl;
  }

  get<T>(url: string, params?: any): any {
    //TODO: @shalom.l implement <T> notation
    if (params) {
      params = new HttpParams({
        fromObject: params
      });
    }
    return this.http.get(`${this.baseUrl}/${url}`, params);
  }
  post(url: string, body: any, multipartData?: FormData) {}
  delete(url: string, params?: any) {}
  update(url: string, body: any, multipartData?: FormData) {}
}
