import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [DatePipe]
})
export class RegistrationComponent implements OnInit {
  @ViewChild('registrationForm', { read: true, static: false }) public registrationForm: NgForm;
  public params: types.RegistrationAPI;
  private registrationResp: types.RegistrationResponse;
  private agreeConfirmCheckBox: boolean = false;
  private registrationFormCorrect: boolean = true;
  private registrationFormData: types.RegistrationFormData;
  private ERROR_API: any = errorTypes.api.registration;
  private ERROR_APP: any = errorTypes.app.registration;
  public showEqualError: boolean = false;
  public showEqualErrorText: string;
  public errorMes: string;
  public minLength: 5;
  private resp: any;

  constructor(
    private data: HttpService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDataForDateOptions ();
  }

  public setRegConf(firstNameOfUser: string,
    lastNameOfUser: string,
    nickNameOfUser: string,
    birthdayDate: string,
    email: string,
    password: string,
    passConf: string): void {

    if(password === passConf){
      let data = {
        birthDate: this.datePipe.transform(birthdayDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        email: email,
        lastName: lastNameOfUser,
        name: firstNameOfUser,
        nickname: nickNameOfUser,
        password: password,
        isMobile: false
      } 
      this.showEqualError = false;
      this.params = data;
      this.data.registration(this.params).subscribe(
        (data: types.ApiResponse) => {this.checkStatusData(data);},
        error => this.getErrorCodeApi(error.status, error.error))
    }else if (password !== passConf){
      let result = _.find(this.ERROR_APP, function(o) { return o.code == 100; });
        this.showEqualErrorText = result.title;
        this.showEqualError = true;
    }
  }

  agreeConfirm($event) {
    if($event.target.checked == true) {
      return this.registrationFormCorrect = false;
    } else {
      return this.registrationFormCorrect = true;
    }

  }

  checkStatusData(data: any): void{
    
    setTimeout(() => { this.router.navigate(['/login']) }, 2000);

  }

  getDataForDateOptions (): void {
    let today = new Date();
    let todayTransformed = this.datePipe.transform(today, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    
  }
  getErrorCodeApi(data: number, message: string): void {
    let result = _.find(this.ERROR_API, function(o) { return o.code == data; });
    this.showEqualError = true;
    this.errorMes = result.title + message;
  }

  public clear(event: MouseEvent): void {
    this.registrationForm.reset();
  }
}
