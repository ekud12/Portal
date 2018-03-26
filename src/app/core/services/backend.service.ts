import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
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

    return this.http.get(this._generateUrl(url), { params: params }).timeout(5000);
  }

  post<T>(url: string, body: any, multipartData?: FormData) {
    return this.http.post(this._generateUrl(url), body).timeout(5000);
  }

  delete(url: string, params?: any) {
    return this.http.delete(this._generateUrl(url), { params: params }).timeout(5000);
  }

  put(url: string, body: any, multipartData?: FormData) {
    return this.http.put(this._generateUrl(url), body).timeout(5000);
  }

  private _generateUrl(url) {
    return `${this.baseUrl}/${url}`;
  }
}
