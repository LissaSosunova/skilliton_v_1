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

  constructor(private http: HttpClient,
    private sessionStorage: SessionstorageService,
    private router: Router) { }

  public setAuth(params: types.Login): Observable<any> {
    return this.http.post(URL_BACK + '/login', params, this.registrOptions);
  }

  public registration(params: types.RegistrationAPI): Observable<any> {
    console.log(params)
    return this.http.post(URL_BACK + '/register', params, this.registrOptions);
  }

  public getUser(): Observable<any> {
    return this.http.get(URL_BACK + '/user/me', {headers: this.getHeaders()});
  }


  // Headers for http requests, tocken gets from SessonStorage
  private getHeaders(): HttpHeaders {

    const tokenStr = this.sessionStorage.getValue('_token');
    const tokenType = this.sessionStorage.getValue('tokenType');
    if(tokenStr === "" || tokenStr === null || tokenType === "" || tokenType === null){
      console.log("User doesn't autorizated");
      this.router.navigate(["/login"]);
    }
    const token = tokenType +" "+tokenStr;
    const headers = new HttpHeaders({'Authorization': token});
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
