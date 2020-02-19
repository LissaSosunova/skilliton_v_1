import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../../services/http.service';
import { LoadUserData } from 'src/app/state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../../types/types';
import { LoadLangsData } from '../../../../state/actions/langs.actions';
import * as _ from 'lodash';
import { errorTypes } from '../../../../shared/constants/errors';
import { DatePipe, AsyncPipe } from '@angular/common';
import { EditUserProfileService } from '../../../../services/edit-user-profile.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers: [DatePipe, AsyncPipe]
})
export class GeneralComponent implements OnInit {
@Output() currChildUrl: 'general';
@ViewChild('firstNameOfUser', {static: true}) public firstNameOfUser: string;
@ViewChild('lastNameOfUser', {static: true}) public lastNameOfUser: string;
@Input() user: any;
public userUploaded: boolean = false;
public searchLangsControl: FormControl;
public searchOtherLangsControl: FormControl;
public langs = [] as  any;
public optionsLangs: any;
public universitySelected: boolean = true;
private unsubscribe$: Subject<void> = new Subject();
public langName: any;
public langsOther: any;

// Mail and Femail
public maleSelect: boolean = false;
public femaleSelect: boolean = false;
// Make editable
public editableFirstName: boolean = false;
public editableLastName: boolean = false;
public editableBirthDay: boolean = false;
public openAutoNative: boolean = false;
public openAutoOtherLang: boolean = false;
public nativeLangRequired: boolean = false;
// Datepicker
public minimalYear: number;
public checkDate: number;
public birthDate: string;
public birthdayDate: any;
// Errors
public errorTextDate: string;
private ERROR_API: any = errorTypes.api.registration;
private ERROR_APP: any = errorTypes.app.editProfile;
public errorAPP: string;
public showEqualError: boolean = false;

public firstNameErr:  boolean = false;
public errorFirstNameText: string;

public lastNameErr:  boolean = false;
public errorLastNameText: string;

public sexErr:  boolean = false;
public errorSexText: string;

  constructor(
    private data: HttpService,
    public router: Router,
    private store: Store<any>,
    private datePipe: DatePipe,
    private editData: EditUserProfileService,
  ) { }

  ngOnInit() {
    this.init();
    this.initSearchLangsForm();
    this.initSearchOtherLangsForm();
    this.getDataForDateOptions();
  }
  init() {
    if (this.user === undefined || this.user === {}) {
      const user$$ = this.store.select('user').subscribe((state: any) => {
        if(state !== undefined || state) {
          this.user = state;
          this.firstNameOfUser = this.user.profile.name;
          if (this.user.profile.sex == 1 ) {
            this.maleSelect = true;
          } else {
            this.femaleSelect = true;
          }
          this.userUploaded = true;
        }
      });
    } else if (this.user !== {}){
      if (this.user.profile.sex === 1 ) {
        this.maleSelect = true;
      } else if (this.user.profile.sex === 2 ){
        this.femaleSelect = true;
      }
      this.userUploaded = true;
    }
    this.store.dispatch(new LoadLangsData());
    const langs$ = this.store.select('langs').subscribe((state: any) => {
      if  (state !== undefined || state && state.langs.length > 1)  {
        this.langs = state;
      }
    });
  }

  getDataForDateOptions (): void {
    let today = new Date();
    this.minimalYear = +(this.datePipe.transform(today, "yyyy"))-13;
  }
    // Search for langs
    private initSearchLangsForm(): void {
      this.searchLangsControl = new FormControl();
      this.searchLangsControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
        .subscribe(query => {
          if (query) {
            this.setSearchLangs(query);
          } else if (!query || query === '') {
            this.openAutoNative = false;
          }
        });
    }
    private initSearchOtherLangsForm(): void {
      this.searchOtherLangsControl = new FormControl();
      this.searchOtherLangsControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
        .subscribe(query => {
          if (query) {
            this.setSearchOtherLangs(query);
          } else if (!query || query === '') {
            this.openAutoOtherLang = false;
          }
        });
    }
    public setSearchLangs(query: string): void {
      const querySearch = _.lowerCase(query);
      const langsArr = this.langs.langs;
      const search = _.filter(langsArr, o => _.includes(o.srchStr, querySearch));
      this.openAutoNative = true;
      this.optionsLangs = search;
      if (this.optionsLangs.length === 0) {
        this.openAutoNative = false;
      }
    }
    public setSearchOtherLangs(query: string): void {
      const querySearch = _.lowerCase(query);
      const langsArr = this.langs.langs;
      const userLangs = this.user.profile.langs.other;
      const search = _.filter(langsArr, o => _.includes(o.srchStr, querySearch));
      const result1 = _.differenceBy(search, userLangs, 'id');
      this.openAutoOtherLang = true;
      this.optionsLangs = result1;
      if (this.optionsLangs.length === 0) {
        this.openAutoOtherLang = false;
      }
    }

    public setValueNativeFromDropDown(option) {
      this.user.profile.langs.native.push({name: option.name, id: option.id, native: option.native});
      let params = [];
      this.user.profile.langs.native.forEach((o) => {
        params.push(o.id);
      });
      this.editData.sendData('nativeLang', params);
      this.openAutoNative = false;
      this.nativeLangRequired = false;
      this.searchLangsControl.reset({ value: '', disabled: false });

    }
    public setValueOtherFromDropDown(option) {
      this.user.profile.langs.other.push({name: option.name, id: option.id, native: option.native});
      let params = [];
      this.user.profile.langs.other.forEach((o) => {
        params.push(o.id);
      });
      this.editData.sendData('otherLang', params);
      this.openAutoOtherLang = false;
      this.searchOtherLangsControl.reset({ value: '', disabled: false });
    }
    public changeOtherLangItem(option) {
      let params = [];
      const deletItem = _.remove(this.user.profile.langs.other, {id: option.id});
      const langAPI = _.remove(this.user.profile.langs.other, (n) => {
        return n === option.id;
      });
      this.user.profile.langs.other.forEach((o) => {
        params.push(o.id);
      });
      this.editData.sendData('otherLang', params);
      this.updateUserData();
    }
    public changeNativeLangItem(option) {
      let params = [];
      const deletItem = _.remove(this.user.profile.langs.native, {id: option.id});
      const langAPI = _.remove(this.user.profile.langs.native, (n) => {
        return n === option.id;
      });
      this.user.profile.langs.native.forEach((o) => {
        params.push(o.id);
      });
      this.editData.sendData('nativeLang', params);
      this.updateUserData();
    }
    // First name
    public changeFirstName() {
      this.editableFirstName = !this.editableFirstName;
    }
    public cancelName() {
      this.errorFirstNameText = '';
      this.firstNameErr = false;
      this.editableFirstName = false;
    }
    public saveNewName(key: string, newVal) {
      if (newVal === null) {
        let result = _.find(this.ERROR_APP, ((o) => { return o.code == 100; }) );
        this.getErrorCodeApp(100);
        this.errorFirstNameText = result.title;
        this.firstNameErr = true;
        this.editableFirstName = true;
      } else {
        this.editData.sendData(key, newVal);
        this.errorFirstNameText ='';
        this.firstNameErr = false;
        this.editableFirstName = false;
      }
    }
    // Last name
    public changeLastName() {
      this.editableLastName = !this.editableLastName;
    }
    public cancelLastName() {
      this.errorLastNameText = '';
      this.lastNameErr = false;
      this.editableLastName = false;
    }
    public saveNewData (key: string, newVal) {
      if (newVal === null) {
        let result = _.find(this.ERROR_APP, ((o) => { return o.code == 100; }) );
        this.getErrorCodeApp(100);
        this.errorLastNameText = result.title;
        this.lastNameErr = true;
        this.editableLastName = true;
      } else {
        this.editData.sendData(key, newVal);
        this.errorLastNameText = '';
        this.lastNameErr = false;
        this.editableLastName = false;
      }
    }
    // Birthday
    public changeBirthday() {
      this.editableBirthDay = !this.editableBirthDay;
    }
    public cancelBD() {
      this.editableBirthDay = false;
    }
    // Function checks correct date in input datepicker
  public checkDatePicker(event, birthdayDate: string, data?: any): void {
    console.log(event, birthdayDate, data)

    this.checkDate = +(this.datePipe.transform(birthdayDate, "yyyy"));
    if(this.checkDate >= this.minimalYear){
      let result = _.find(this.ERROR_APP, function(o) { return o.code == 103; });
      this.getErrorCodeApp(103);
      this.errorAPP = result.title;
      this.errorTextDate = this.errorAPP;
    } else {
      this.errorTextDate= '';
      this.showEqualError = false;
      this.errorAPP = '';
    }
    if (birthdayDate !== null) {
      const newVal = this.datePipe.transform(birthdayDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      this.editData.sendData('birthDate', newVal);
      this.updateUserData();
      this.editableBirthDay = false;
    }
  }

  // Sex
  public maleSelected (e) {
    if (e.target.checked === true) {
      this.femaleSelect = false;
      this.editData.sendData('sex', 1);
    } 
  }
  public femaleSelected(e) {
    if (e.target.checked === true) {
      this.maleSelect = false;
      this.editData.sendData('sex', 2);
    } 
  }

  getErrorCodeApp(data: number): void  {
    this.errorAPP = '';
    let result = _.find(this.ERROR_APP, function(o) { return o.code == data; });
    this.showEqualError = true;
    this.errorAPP = result.title;
  }

  public updateUserData(): void {
    this.store.dispatch(new LoadUserData());
    const newUser$ = this.store.select('user').subscribe((state: any) => {
      if  (state !== undefined)  {
        this.user = state;
      }
    });
  }
}
