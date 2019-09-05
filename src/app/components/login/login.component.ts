import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { types } from '../../types/types';
import * as _ from 'lodash';

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
  @ViewChild('loginForm', { read: true, static: false }) public loginForm: NgForm;

  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router) { }

  ngOnInit() {
    this.isLogin = false;
    this.getDataFromLocalStorage('user');
  }
  public openLogin (): void {
      this.isLogin == false ? this.isLogin = true : this.isLogin = false;
  }

  public setAuthConf(username: string, password: string, rememberMe: boolean): void {
    if(rememberMe){
      this.localstorageService.setValue('user', username);
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
 
getErrorCodeApi(data: number, message: string): void {
  console.log(data);
  let result = _.find(this.ERROR_API, function(o) { return o.code == data; });
  this.showError = true;
  // this.showErrorText = result.title + message;
  this.showErrorText =  message;
}
checkStatusData(data: any): void{
  console.log(data);
  
  this.router.navigate(['/home']);
}
}
