import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import {  NgForm, NgModelGroup, NgModel } from '@angular/forms';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { LeavePopupComponent} from './leave-popup/leave-popup.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [DatePipe]
})
export class RegistrationComponent implements OnInit {
  @ViewChild('registrationForm', { read: true, static: false }) public registrationForm: NgForm;
  @ViewChild('leaveRegistration', { static: false }) public leaveRegistration: LeavePopupComponent;

  public params: types.RegistrationAPI;
  private agreeConfirmCheckBox: boolean = false;
  private registrationFormCorrect: boolean = true;
  private ERROR_API: any = errorTypes.api.registration;
  private ERROR_APP: any = errorTypes.app.registration;
  public showEqualError: boolean = false;
  public showEqualErrorText: string;
  public showAPIError: boolean = false;
  public errorAPP: string;
  public errorAPI: string;
  public minLength: 5;
  private resp: any;
  public openConfirmPopup: boolean = false;
  private minimalYear: number;
  public checkDate: number;
  @Input() errorTextDate: string;

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
    birthdayDate: string,
    email: string,
    password: string,
    passConf: string): void {
      
    if(password === passConf){
      this.checkDateFn();
      let data = {
        birthDate: this.datePipe.transform(birthdayDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        email: email,
        lastName: lastNameOfUser,
        name: firstNameOfUser,
        password: password,
        isMobile: false
      } 
      this.showEqualError = false;
      this.params = data;
      if(this.registrationFormCorrect === false){
        let result = _.find(this.ERROR_APP, function(o) { return o.code == 102; });
        this.errorAPP = result.title;
      } else {
        this.registrationFormCorrect === true;
        this.errorTextDate= '';
        this.showEqualError = false;
        this.data.registration(this.params).subscribe(
          (data: types.ApiResponse) => {this.checkStatusData(data);},
          error => this.getErrorCodeApi(error.status, error.error))
      }
    } else if (password !== passConf){
      let result = _.find(this.ERROR_APP, function(o) { return o.code == 100; });
        this.showEqualErrorText = result.title;
        this.showEqualError = true;
    }
  }
// Function checks inputs and makes send button visible
  agreeConfirm($event) {
    if($event.target.checked == true) {
      this.checkDateFn();
      return this.registrationFormCorrect = false;
    } else {
      return this.registrationFormCorrect = true;
    }
  }

  checkStatusData(data: any): void{
    setTimeout(() => { this.router.navigate(['/login']) }, 1000);
  }
// Function gets current date
  getDataForDateOptions (): void {
    let today = new Date();
    this.minimalYear = +(this.datePipe.transform(today, "yyyy"))-13;
  }
  // Get text of error on API
  getErrorCodeApi(data: number, message: string): void  {
    this.errorAPP = '';
    let result = _.find(this.ERROR_API, function(o) { return o.code == data; });

    this.errorAPI = result.title + message;
  }
// Get text of error on APP
  getErrorCodeApp(data: number): void  {
    this.errorAPP = '';
    let result = _.find(this.ERROR_APP, function(o) { return o.code == data; });
    this.showEqualError = true;
    this.errorAPP = result.title;
  }
// Function checks correct date in input datepicker
  public checkDatePicker(event, birthdayDate: string): void {
    this.checkDate = +(this.datePipe.transform(birthdayDate, "yyyy"));
    if(this.checkDate >= this.minimalYear){
      this.registrationFormCorrect = false;
      let result = _.find(this.ERROR_APP, function(o) { return o.code == 103; });
      this.getErrorCodeApp(103);
      this.errorAPP = result.title;
      this.errorTextDate = this.errorAPP;
    } else {
      this.errorTextDate= '';
      this.showEqualError = false;
      this.errorAPP = '';
    }
  }
// Function checks correct date before send request
  public checkDateFn(minimalYear = this.minimalYear, checkDate = this.checkDate) {
    if(checkDate >= minimalYear && this.registrationForm){
      this.registrationForm.invalid;
      this.registrationFormCorrect = false;
      this.showEqualError = true;
      this.getErrorCodeApp(103);
      this.errorTextDate = this.errorAPP;
    } else {
      this.registrationFormCorrect = true;
    }
  }
}
