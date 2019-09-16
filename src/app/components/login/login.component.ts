import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, Input } from '@angular/core';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { PopupComponent } from "../modals/popup/popup.component";
import { PopupControls, PopupControlsService } from '../../services/popup-controls.service';
import { ErrorModalComponent } from "../modals/error-modal/error-modal.component";
import { AlertModalComponent } from "../modals/alert-modal/alert-modal.component";

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
  public user: types.NewUser = {} as types.NewUser;
  @ViewChild('loginForm', { read: true, static: false }) public loginForm: NgForm;
  @ViewChild('infoPopup', { static: false }) public infoPopup: AlertModalComponent;
  @Output() rememberMeText: string = 'Remember me';

  @Input() public actionName: string;

  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router,
    public errorModal: ErrorModalComponent,
    public alertModal: AlertModalComponent,
    // private store: Store<any>
    ) { }

  ngOnInit() {
    this.isLogin = false;
    this.getDataFromLocalStorage('user');

    // this.infoPopup.onClose();
    
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
  //  const data = this.localstorageService.getValue(key);
  //  if(data !== "" && data !== null){
  //   // this.router.navigate(['/home']);
  //  } 

 }
//  Check on error, show details of error
getErrorCodeApi(data: number, message: string): void {
  let result = _.find(this.ERROR_API, function(o) { return o.code == data; });
  this.showError = true;
  (typeof(message)  === 'string') ?
  this.showErrorText =  result.title + " Details: "+ message:
  // this.showErrorText =  result.title;
  this.actionName = result.title;
  // this.popupConteiner.innerHtml = this.showErrorText;
  console.log(this.actionName);
  this.infoPopup.actionName = this.actionName;
  this.infoPopup.open();

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
public onPopupOpen(): void {
  this.infoPopup.open();
}
}
