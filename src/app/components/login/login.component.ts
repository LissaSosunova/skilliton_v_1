import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { types } from '../../types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogin: boolean;
  public params: types.Login;

  // @ViewChild('loginForm') public loginForm: NgForm;

  constructor() { }

  ngOnInit() {
    this.isLogin = false;
  }
  public openLogin (): void {
      this.isLogin == false ? this.isLogin = true : this.isLogin = false;
  }

  public setAuthConf(username: string, password: string): void {
    this.params = {
      username,
      password
    };
  
}
}
