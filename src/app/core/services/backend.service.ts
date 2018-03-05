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

    const options = this._generateParams(params);

    return this.http.get(this._generateUrl(url), { params: params });
  }

  post<T>(url: string, body: any, multipartData?: FormData) {
    return this.http.post(this._generateUrl(url), body);
  }
  delete(url: string, params?: any) {}
  update(url: string, body: any, multipartData?: FormData) {}

  private _generateUrl(url) {
    return `${this.baseUrl}/${url}`;
  }

  private _generateParams(rawParams) {
    let options = {};

    if (rawParams) {
      options = { params: new HttpParams({ fromObject: rawParams }) };
    }

    return options;
  }
}
