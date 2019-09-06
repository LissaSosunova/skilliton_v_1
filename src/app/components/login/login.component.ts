import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLogin: boolean;
  public params: types.Login;
  public token: string;
  public dataResp: types.LoginResp;
  public errorMessage: string;
  public nickname: string;
  public password: string;
  public isFormValid: boolean;
  public rememberMe: boolean = false;
  private ERROR_API: any = errorTypes.api.login;
  private ERROR_APP: any = errorTypes.app.login;
  public showError: boolean = false;
  public showErrorText: string;
  public user: types.User = {} as types.User;
  @ViewChild('loginForm', { read: true, static: false }) public loginForm: NgForm;

  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private transferService: TransferService
    // private store: Store<any>
    ) { }

  ngOnInit() {
    this.isLogin = false;
    this.getDataFromLocalStorage('user');
  }
  public openLogin (): void {
      this.isLogin == false ? this.isLogin = true : this.isLogin = false;
  }

  public setAuthConf(username: string, password: string, rememberMe: boolean): void {
    if(rememberMe){
      this.localstorageService.setValue(username, 'user');
    }
    this.params = {
      username,
      password,
      rememberMe
    };
    this.data.setAuth(this.params).subscribe(
      (data: types.ApiResponse) => {this.checkStatusData(data);},
      error => this.getErrorCodeApi(error.status, error.error))
  }

  public rememberMeClick(e) {
    // Read and write data to localStorage
    this.rememberMe= e.target.checked;
 }

 getDataFromLocalStorage (key: string) {
   const data = this.localstorageService.getValue(key);
   console.log(key, 'is exist: ', data);
   return data;

 }
//  Check on error, show details of error
getErrorCodeApi(data: number, message: string): void {
  let result = _.find(this.ERROR_API, function(o) { return o.code == data; });
  this.showError = true;
  (typeof(message)  === 'string') ?
  this.showErrorText =  result.title + " Details: "+ message:
  this.showErrorText =  result.title;
}
// Check status of response, set tocken and navigate to HOME page
checkStatusData(data: any): void{
  if(data.accessToken){
    const tokenType = data.tokenType;
    this.token = data.accessToken;
    this.sessionStorageService.setValue(this.token, '_token');
    this.sessionStorageService.setValue(tokenType, 'tokenType');
    this.router.navigate(['/home']);
  }
}
}
