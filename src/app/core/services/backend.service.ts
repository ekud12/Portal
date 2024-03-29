import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/timeoutWith';

@Injectable()
export class BackendService {
  baseUrl: string;
  tokenBaseUrl: string;
  timeoutError: Error = new Error();
  maxTimeout: number;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.http.baseUrl;
    this.timeoutError.message = 'פג תוקף זמן הפעולה.';
    this.timeoutError.name = 'שגיאה';
    this.maxTimeout = 10000;
  }

  get<T>(url: string, params?: any) {
    return this.http.get(this._generateUrl(url), { params: params }).timeoutWith(this.maxTimeout, Observable.throw(this.timeoutError));
  }

  post<T>(url: string, body: any, multipartData?: FormData) {
    return this.http.post(this._generateUrl(url), body).timeoutWith(this.maxTimeout, Observable.throw(this.timeoutError));
  }

  delete(url: string, params?: any) {
    return this.http.delete(this._generateUrl(url), { params: params }).timeoutWith(this.maxTimeout, Observable.throw(this.timeoutError));
  }

  put(url: string, body: any, multipartData?: FormData) {
    return this.http.put(this._generateUrl(url), body).timeoutWith(this.maxTimeout, Observable.throw(this.timeoutError));
  }

  private _generateUrl(url) {
    return `${this.baseUrl}/${url}`;
  }
}
