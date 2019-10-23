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
    return this.http.post(URL_BACK + '/register', params, this.registrOptions);
  }

  public getUser(): Observable<any> {
    return this.http.get(URL_BACK + '/user/me', {headers: this.getHeaders()});
  }

  public getTags(): Observable<any> {
    return this.http.get(URL_BACK + '/tags', {headers: this.getHeaders()});
  }
  public getLangs(): Observable<any> {
    return this.http.get(URL_BACK + '/langs', {headers: this.getHeaders()});
  }
  // Post data scills/goals/interests from exact info
  public postInitInfo(params: types.PostInitInfo, infoType: string): Observable<any> {
    return this.http.post(URL_BACK + '/user/init-info/' + infoType, params, {headers: this.getHeaders()});
  }

  public postSkipedInitInfo(params: string): Observable<any> {
    return this.http.get(URL_BACK + '/user/skip-skill/' + params, {headers: this.getHeaders()});
  }

  public postTags(params: types.PostTag): Observable<any> {
    return this.http.post(URL_BACK + '/tags', params, {headers: this.getHeaders()});
  }

  public postNewGoal(params: types.AddGoalAPI): Observable<any> {
    return this.http.post(URL_BACK + '/user/add-goal', params, {headers: this.getHeaders()});
  }

  public postNewSkill(params: types.AddSkillAPI): Observable<any> {
    return this.http.post(URL_BACK + '/user/add-skill', params, {headers: this.getHeaders()});
  }

  public uploadAvatar(params: types.AvatarObject): Observable<any> {
    return this.http.post(URL_BACK + '/user/edit-profile', params, {headers: this.getHeaders()});
  }

  public postNewService(params: types.AddServiceAPI): Observable<any> {
    return this.http.post(URL_BACK + '/user/add-service', params, {headers: this.getHeaders()});
  }
  
  // Headers for http requests, tocken gets from SessonStorage
  private getHeaders(): HttpHeaders {

    const tokenStr = this.sessionStorage.getValue('_token');
    const tokenType = this.sessionStorage.getValue('tokenType');
    if(tokenStr === "" || tokenStr === null || tokenType === '' || tokenType === null){
      this.router.navigate(["/login"]);
    }
    const token = tokenType + ' ' + tokenStr;
    const headers = new HttpHeaders({'Authorization': token});
    return headers;
  }
  // Function for geting status codes
  getStatusCode = r => {
    if (r.status !== 200) {
      return {
        data: {},
        status: r.status
      };
    }

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
    }
    if (r.status == 404) {
      this.router.navigate(['/login']);
    }

    return;
  }
}
