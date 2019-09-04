import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { types } from '../types/types';
import { SessionstorageService } from './sessionstorage.service';
import { Router } from '@angular/router';
import { typeSourceSpan } from '@angular/compiler';

const URL_BACK = 'http://185.41.250.120:8080';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  registrOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loginOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  constructor(private http: HttpClient,
    private sessionStorage: SessionstorageService,
    private router: Router) { }

  public setAuth(params: types.Login): Observable<any> {
    // Body especial for Login
    let body = new URLSearchParams();
    body.set('username', params.username);
    body.set('password', params.password);
    body.set('rememberMe', params.rememberMe.toString());
    console.log();
    return this.http.post(URL_BACK + '/login', body.toString(), this.loginOptions);
  }

  public registration(params: types.RegistrationAPI): Observable<any> {
    console.log(params)
    return this.http.post(URL_BACK + '/register', params, this.registrOptions);
  }

  // Headers for http requests, tocken gets from SessonStorage
  private getHeaders(endPoint): HttpHeaders {

    const token = this.sessionStorage.getValue('_token');
    const tokenKey = this.sessionStorage.getValue('token_key');
    const headers = new HttpHeaders({'authorization': token, 'token_key': tokenKey});
    return headers;
  }
  // Function for geting status codes
  getStatusCode = r => {
    if (r.status !== 200)
      return {
        data: {},
        status: r.status
      };

    const res = r.json();
    this.router.navigateByUrl('/login');
    return {
      ...res,
      data: res.data || null,
      status: r.status,
      errorMessage: res.errorMessage
    };
  }

  private handleError = (r: Response): Observable<types.ApiResponse> => {
    let res: any = {};

    try {
      res = r.json();
    } catch (err) {
      console.log(err);
    }
    if (r.status == 404) {
      this.router.navigate(['/login']);
    }

    return;
  }
}
