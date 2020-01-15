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

  public confirmAccaunt(params: string): Observable<any> {
    return this.http.get(URL_BACK + '/confirm_account?activation_code=' + params);
  }

  public resendActivationCode(params: string): Observable<any> {
    return this.http.get(URL_BACK + '/resend_activation_code?activation_code=' + params);
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

  public getSearchAll(query: string): Observable<any> {
    return this.http.get(URL_BACK + '/search/all/?query=' + query, {headers: this.getHeaders()});
  }

  // Edit profile function
  public postNewProfileData(params: any): Observable<any> {
    return this.http.post(URL_BACK + '/user/edit-profile', params, {headers: this.getHeaders()});
  }

  public postWork(params: types.AddWork): Observable<any> {
    return this.http.post(URL_BACK + '/user/add-work', params, {headers: this.getHeaders()});
  }

  public getWork(): Observable<any> {
    return this.http.get(URL_BACK + '/work', {headers: this.getHeaders()});
  }

  public getEducation(): Observable<any> {
    return this.http.get(URL_BACK + '/education', {headers: this.getHeaders()});
  }

  public postEducation(params: types.AddEducation): Observable<any> {
    return this.http.post(URL_BACK + '/user/add-education', params, {headers: this.getHeaders()});
  }

// Other users

public getMate(params: string): Observable<any> {
  return this.http.get(URL_BACK + '/user/profile/' + params, {headers: this.getHeaders()});
  }

  // Matches for page 'My matches'
  public getIncomingMatches(): Observable<any> {
    return this.http.get(URL_BACK + '/matches/income', {headers: this.getHeaders()});
  }
  public getOutcomingMatches(): Observable<any> {
    return this.http.get(URL_BACK + '/matches/outcome', {headers: this.getHeaders()});
  }
  public getActiveMatches(): Observable<any> {
    return this.http.get(URL_BACK + '/matches/active', {headers: this.getHeaders()});
  }
  public getConfirmMaych(params: number, action: boolean): Observable<any> {
    return this.http.get(URL_BACK + '/match/' + params + '/confirm/' + action, {headers: this.getHeaders()});
  }
  public postReqMatchShare(id: number): Observable<any> {
    return this.http.get(URL_BACK + '/match/share?skillId=' + id, {headers: this.getHeaders()});
  }
  public postReqMatchObtain(id: number): Observable<any> {
    return this.http.get(URL_BACK + '/match/obtain?goalId=' + id, {headers: this.getHeaders()});
  }
  // Subscription on posts of other user
  public getSubscriptionMate(mail: string, interested: boolean): Observable<any> {
    return this.http.get(URL_BACK + '/match/' + mail + '/subscribe/' + interested, {headers: this.getHeaders()});
  }

  // Search locations
  // Get all
  public getAllLocations(): Observable<any> {
    return this.http.get(URL_BACK + '/locations/full', {headers: this.getHeaders()});
  }
  // Get all counries
  public getAllCountries(): Observable<any> {
    return this.http.get(URL_BACK + '/locations', {headers: this.getHeaders()});
  }
  // Get cities by country ID
  public getCitiesByID(id: number): Observable<any> {
    return this.http.get(URL_BACK + '/locations/' + id, {headers: this.getHeaders()});
  }
  // Get chat list
  public getChatList(): Observable<any> {
    return this.http.get(URL_BACK + '/chat/chat-list', {headers: this.getHeaders()});
  }
  // Get chat by ID
  public getChat(id: number): Observable<any> {
    return this.http.get(URL_BACK + '/chat/events/' + id, {headers: this.getHeaders()});
  }
  // Headers for http requests, tocken gets from SessonStorage
  private getHeaders(): HttpHeaders {

    const tokenStr = this.sessionStorage.getValue('_token');
    const tokenType = this.sessionStorage.getValue('tokenType');
    if(tokenStr === "" || tokenStr === null || tokenType === '' || tokenType === null){
      this.router.navigate([""]);
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
    this.router.navigateByUrl('');
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
      this.router.navigate(['']);
    }

    return;
  }
}
