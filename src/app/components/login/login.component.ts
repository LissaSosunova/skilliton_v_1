import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { NgForm } from '@angular/forms';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { types } from '../../types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLogin: boolean;
  public params: types.LoginAPI;
  public token: string;
  public dataResp: types.LoginResp;
  public errorMessage: string;
  public nickname: string;
  public password: string;
  public isFormValid: boolean;
  public rememberMe: boolean;
  @ViewChild('loginForm', { read: true, static: false }) public loginForm: NgForm;

  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService) { }

  ngOnInit() {
    this.isLogin = false;
    this.getDataFromLocalStorage('user');
  }
  public openLogin (): void {
      this.isLogin == false ? this.isLogin = true : this.isLogin = false;
  }

  public setAuthConf(nickname: string, password: string, rememberMe: boolean): void {
    if(rememberMe){
      this.localstorageService.setValue('user', nickname);
    }
    this.params = {
      nickname,
      password
    };
  console.log(this.params);
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

}
