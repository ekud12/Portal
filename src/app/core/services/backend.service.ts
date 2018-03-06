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
    // TODO: @shalom.l implement <T> notation

    return this.http.get(this._generateUrl(url), { params: params });
  }

  post<T>(url: string, body: any, multipartData?: FormData) {
    return this.http.post(this._generateUrl(url), body);
  }

  delete(url: string, params?: any) {
    return this.http.delete(this._generateUrl(url), { params: params });
  }

  put(url: string, body: any, multipartData?: FormData) {
    return this.http.put(this._generateUrl(url), body);
  }

  private _generateUrl(url) {
    return `${this.baseUrl}/${url}`;
  }
}
