import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Output, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { types } from '../../types/types';
import { Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { Store} from '@ngrx/store';
import { LoadUserData } from '../../state/actions/user.actions';
import { LoadTags } from '../../state/actions/filters.actions';

@Component({
  selector: 'app-set-exactdata-page',
  templateUrl: './set-exactdata-page.component.html',
  styleUrls: ['./set-exactdata-page.component.scss']
})
export class SetExactdataPageComponent implements OnInit, OnDestroy {
  @ViewChild('skillsDataForm', { static: false }) public skillsDataForm: NgForm;
  @ViewChild('goalsDataForm', { static: false }) public goalsDataForm: NgForm;
  @ViewChild('interestsDataForm', { static: false }) public interestsDataForm: NgForm;

  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();

  private paramsPostInitInfo: types.PostInitInfo;
  private createNewElem: types.CategoryElement;

  private ERROR_API: any = errorTypes.api.login;
  private ERROR_APP: any = errorTypes.app.setExactData;

  public options: any;
  public user: types.NewUser;
  private goToNextPage: boolean = false;
  private isTagsSkills:  boolean = true;
  private isTagsGoals:  boolean = true;
  private isTagsInterests:  boolean = true;
  private openAuto: boolean = false;
  private showBtn: boolean = false;

  @Output() chipsSkills = [] as  any;
  @Output() chipsGoals = [] as  any;
  @Output() chipsInterest = [] as  any;
  @Output() actionName: string;
  @Output() headerError: any;
  @Output() details: string;
  @Output() recomend: string;
  public showErrorText: string;
  public tags: any;
  private selectedTagsId = [] as  any;
  // For future
  private newTags = [] as  any;
  private activePage: string;
  private userUploaded: boolean = false;
  private ifErrAPIPage: string;
  @Input() valueSearch: any;
  @ViewChild('infoPopup', { static: false }) public infoPopup: AlertModalComponent;

  constructor(
    private data: HttpService,
    private router: Router,
    public alertModal: AlertModalComponent,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadTags());
    this.init();
    this.initSearchForm();
  }

  init() {
    this.getFilters();
    this.getUserData();
  }
  private getFilters(): void {
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if (state !== undefined || state && state.skills.length > 1) {
        this.tags = state;
      }
    });
  }
  private getUserData(): void {
  this.store.dispatch(new LoadUserData());
  const user$ = this.store.select('user').subscribe((state: any) => {
    if (state !== undefined || state) {
      this.user = state;
      this.userUploaded = true;
      if((this.user.keyData.skills.length === 0 ||
        this.user.keyData.skills == null) &&
        this.user.keyData.skillsSkipped === false) {
        this.activePage = "skills";
      } else if ((this.user.keyData.goals.length === 0 ||
        this.user.keyData.goals == null) &&
        this.user.keyData.skillsSkipped === true
        && this.user.keyData.goalsSkipped === false) {
        this.activePage = "goals";
      } else if(this.user.keyData.interests.length === 0 ||
        this.user.keyData.interests == null && (this.activePage !== "skills" && this.activePage !== "goals")) {
        this.activePage = "interests";
      } else if (this.user.keyData.interests.length !== 0 && 
        (this.activePage !== "skills" && this.activePage !== "goals") ){
        this.router.navigateByUrl('/home');
      }
    }
  });
}

  public setValue(val) {
    if (val !== null) {
      setTimeout(() => {
        if (this.activePage !== 'interests') {
          this.openAlertAboutNewSkill(100);
        } else {
          this.openAlertAboutNewSkill(101);
        }
      });
    }
  }
  // Alert functions
  public onPopupOpen(): void {
    this.infoPopup.open();
  }
  public openAlertAboutNewSkill(code: number) {
    const result = _.find(this.ERROR_APP, function(o) { return o.code === code; });
    this.showErrorText =  result.title;
    this.actionName = this.showErrorText;
    this.headerError = 'Error of creating new name';
    this.recomend = result.recomend;
    this.infoPopup.open();
  }


  public skipField(page: string, name: string) {
    // Temporary method for continue work if API skip answered error with status 200
    this.ifErrAPIPage = page;
    this.data.postSkipedInitInfo(name).subscribe(
      (data: types.ApiResponse) => {this.checkStatusData(data, page); } ,
      error => this.getErrorCodeApi(error.status, error.error));
  }
  public setValueFromDropDown(option, param: string) {
  this.openAuto = false;
  if (param === 'skills') {
    this.chipsSkills.push({name: option.name, id: option.id});
    this.goToNextPage = true;
    if (this.chipsSkills.length === 20) {
    this.isTagsSkills = false;
  }
  } else if (param === 'goals') {
    this.chipsGoals.push({name: option.name, id: option.id});
    this.goToNextPage = true;
    if (this.chipsGoals.length === 20) {
      this.isTagsGoals = false;
    }
  } else if (param === 'interests') {
    this.chipsInterest.push({name: option.name, id: option.id});
    this.goToNextPage = true;
    if (this.chipsInterest.length === 20) {
    this.isTagsInterests = false;
  }
}
}

  public goNext(page: string) {
    let params = {};
    // this.goToNextPage = false;
    this.activePage = page;
    if (page === 'goals' && this.chipsSkills.length !== 0 ) {
      this.chipsSkills.forEach(el => {
        this.selectedTagsId.push(el.id);
      });
      params = {selectedTagsId: this.selectedTagsId};
      this.postNewData(params, 'skill', page);
      this.newTags = [];
      this.selectedTagsId = [];
      this.chipsSkills = [];
    } else if (page === 'interests' && this.chipsGoals.length !== 0) {
      this.chipsGoals.forEach(el => {
        this.selectedTagsId.push(el.id);
      });
      params = {selectedTagsId: this.selectedTagsId};
      this.postNewData(params, 'goal', page);
      this.newTags = [];
      this.selectedTagsId = [];
      this.chipsGoals = [];
    } else if (page === 'done' && this.chipsInterest.length !== 0) {
      this.chipsInterest.forEach(el => {
        this.selectedTagsId.push(el.id);
      });
      params = {selectedTagsId: this.selectedTagsId};
      this.postNewData(params, 'interest');
      this.newTags = [];
      this.selectedTagsId = [];
      this.chipsInterest = [];
    }
  }


  public setSearch(query: string): void {
    const querySearch = _.lowerCase(query);
    if (this.activePage === 'skills' || this.activePage === 'goals') {
      this.options = this.tags.skills;
      const search = _.filter(this.tags.skills, o => _.includes(o.srchStr, querySearch));
      this.openAuto = true;
      if (this.chipsSkills.length !== 0) {
        const result = _.differenceBy(search, this.chipsSkills, 'id');
        this.options = result;
      } else {
        this.options = search;
      }
      if (this.options.length === 0) {
        this.openAuto = false;
        this.openAlertAboutNewSkill(100);
      }
    } else if (this.activePage === 'interests') {
      this.options = this.tags.interests;
      const search = _.filter(this.tags.interests, o => _.includes(o.srchStr, querySearch));
      this.openAuto = true;
      if (this.chipsSkills.length !== 0) {
        const result = _.differenceBy(search, this.chipsSkills, 'id');
        this.options = result;
      } else {
        this.options = search;
      }
      if (this.options.length === 0) {
        this.openAuto = false;
        this.openAlertAboutNewSkill(101);
      }
    }
  }

  private initSearchForm(): void {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearch(query);
        } else if (!query || query === '') {
          this.openAuto = false;
        }
      });
  }

  // HTTP req
  private postNewData(params: any, infoType: string, page?: string) {
    this.data.postInitInfo(params, infoType).subscribe(
      (data: any) => { this.checkStatusData(data, page); } ,
      error => this.getErrorCodeApi(error.status, error.error));

  }
  //  Check on error, show details of error
  getErrorCodeApi(data: number, message: any): void {
    // const result = _.find(this.ERROR_API, function(o) { return o.code === data; });
    if (data === 200 ) {
      this.checkStatusData(data, this.ifErrAPIPage);
    }
  }
  checkStatusData(data: any, page?: string): void {
    if (data) {
      if (page) {
        this.activePage = page;
        this.chipsSkills = [];
        this.goToNextPage = false;
      } else if (typeof data === 'object' && !page) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }
    }
  }
  public onReset(event): void {
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
