import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../../services/http.service';
import { LoadUserData, UpdateUsersGoals } from 'src/app/state/actions/user.actions';
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
@ViewChild('editGeneralForm', { read: true, static: false  }) public editGeneralForm: NgForm;
@Input() user: any;
public userUploaded: boolean = false;
public searchLangsControl: FormControl;
public searchOtherLangsControl: FormControl;
public langs = [] as  any;
public optionsLangs: any;
private universitySelected: boolean = true;
private unsubscribe$: Subject<void> = new Subject();
// Mail and Femail
private maleSelect: boolean = false;
private femaleSelect: boolean = false;
// Make editable
private editableFirstName: boolean = false;
private editableLastName: boolean = false;
private editableBirthDay: boolean = false;
private editableNativeLang: boolean = false;
private openAutoNative: boolean = false;
private openAutoOtherLang: boolean = false;
private nativeLangRequired: boolean = false;
private editableOtherLang: boolean = false;
// Datepicker
private minimalYear: number;
public checkDate: number;
// Errors
private errorTextDate: string;
private ERROR_API: any = errorTypes.api.registration;
private ERROR_APP: any = errorTypes.app.editProfile;
public errorAPP: string;
public showEqualError: boolean = false;

private firstNameErr:  boolean = false;
private errorFirstNameText: string;

private lastNameErr:  boolean = false;
private errorLastNameText: string;

private sexErr:  boolean = false;
private errorSexText: string;

  constructor(
    private data: HttpService,
    private router: Router,
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
    private changeNative() {
      this.editableNativeLang = !this.editableNativeLang;
      this.nativeLangRequired = true;
    }
    private cancelNative() {
      this.errorFirstNameText = '';
      this.firstNameErr = false;
      this.editableNativeLang = false;
    }

    public setValueNativeFromDropDown(option) {
      this.editData.sendData('nativeLang', option.id);
      this.openAutoNative = false;
      this.nativeLangRequired = false;
      this.editableNativeLang = false;
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
      this.editableOtherLang = false;
      this.searchOtherLangsControl.reset({ value: '', disabled: false });
    }
    private changeOtherLangs() {
      this.editableOtherLang = !this.editableOtherLang;
    }
    private changeOtherLangItem(option) {
      let params = [];
      const deletItem = _.remove(this.user.profile.langs.other, {id: option.id});
      const langAPI = _.remove(this.user.profile.langs.other, (n) => {
        return n === option.id;
      });
      this.user.profile.langs.other.forEach((o) => {
        params.push(o.id);
      });
      this.editData.sendData('otherLang', params);
      this.store.dispatch(new LoadUserData());
      const newUser$ = this.store.select('user').subscribe((state: any) => {
        if  (state !== undefined)  {
          this.user = state;
        }
      });
      if (this.user.profile.langs.other.length === 0 ) {
        this.editableOtherLang = false;
    }
    }
    // First name
    private changeFirstName() {
      this.editableFirstName = !this.editableFirstName;
    }
    private cancelName() {
      this.errorFirstNameText = '';
      this.firstNameErr = false;
      this.editableFirstName = false;
    }
    private saveNewName(key: string, newVal) {
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
    private changeLastName() {
      this.editableLastName = !this.editableLastName;
    }
    private cancelLastName() {
      this.errorLastNameText = '';
      this.lastNameErr = false;
      this.editableLastName = false;
    }
    private saveNewLastName (key: string, newVal) {
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
    private changeBirthday() {
      this.editableBirthDay = !this.editableBirthDay;
    }
    private cancelBD() {
      this.editableBirthDay = false;
    }
    // Function checks correct date in input datepicker
  public checkDatePicker(event, birthdayDate: string): void {
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
      this.editableBirthDay = false;
    }
  }

  // Sex
  private maleSelected (e) {
    if (e.target.checked === true) {
      this.femaleSelect = false;
      this.editData.sendData('sex', 1);
    } 
  }
  private femaleSelected(e) {
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
}