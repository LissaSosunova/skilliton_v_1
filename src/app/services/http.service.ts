import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { types } from '../types/types';
import { SessionstorageService } from './sessionstorage.service';

const URL_BACK = 'http://localhost:5006/';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
    private sessionStorage: SessionstorageService) { }

  public setAuth(params: types.LoginAPI): Observable<any> {
    return this.http.post(URL_BACK + '/login/', params);
  }

  // Headers for http requests, tocken gets from SessonStorage
  private getHeaders(): HttpHeaders {
    const token = this.sessionStorage.getValue('_token');
    const tokenKey = this.sessionStorage.getValue('token_key');
    const headers = new HttpHeaders({'authorization': token, 'token_key': tokenKey});
    return headers;
  }

}
