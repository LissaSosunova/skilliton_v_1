import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { errorTypes } from '../../../shared/constants/errors';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { types } from '../../../types/types';
import { Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import { LoadTags } from '../../../state/actions/filters.actions';
import { LoadUserData } from '../../../state/actions/user.actions';
import { Store} from '@ngrx/store';
import { onInitEffects } from '@ngrx/effects/src/lifecycle_hooks';


@Component({
  selector: 'app-set-exactdata-page',
  templateUrl: './set-exactdata-page.component.html',
  styleUrls: ['./set-exactdata-page.component.scss']
})
export class SetExactdataPageComponent implements OnInit {
  @Input() user: types.NewUser;
  @ViewChild('skillsDataForm', { static: false }) public skillsDataForm: NgForm;
  @ViewChild('goalsDataForm', { static: false }) public goalsDataForm: NgForm;
  @ViewChild('interestsDataForm', { static: false }) public interestsDataForm: NgForm;

  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();

  private paramsPostInitInfo: types.PostInitInfo;
  private createNewElem: types.CategoryElement;

  private ERROR_API: any = errorTypes.api.login;
  private ERROR_APP: any = errorTypes.app.login;

  public options: any;

  private goToNextPage: boolean = false;
  private isTagsSkills:  boolean = true;
  private isTagsGoals:  boolean = true;
  private isTagsInterests:  boolean = true;
  private openAuto: boolean = false;
  private showBtn: boolean = false;

  @Output() tagsSkills = [] as  any;
  @Output() tagsInterests = [] as  any;
  @Output() chipsSkills = [] as  any;
  @Output() chipsGoals = [] as  any;
  @Output() chipsInterest = [] as  any;
  @Output() selected = [] as  any;
  private selectedTagsId = [] as  any;
  private newTags = [] as  any;
  @Input() activePage: string;
  @Input() valueSearch: any;

  constructor(
    private data: HttpService,
    private store: Store<any>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initSearchForm();
    this.init();
  }

  init() {
    this.store.dispatch(new LoadTags());
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if (state !== undefined || state) {
        this.tagsSkills = state.tagsSkills;
        this.tagsInterests = state.tagsInterests;
      }
    });
  }

  public setValue(val) {
    if (val !== null) {
      setTimeout(() => {
        if (this.activePage !== 'interests') {
          this.chipsSkills.push({name: val});
          this.goToNextPage = true;
          this.openAuto = false;
          this.showBtn = true;
          if (this.chipsSkills.length === 2) {
            this.isTagsSkills = false;
          }
        }
      });
    }
  }
    public setValueFromDropDown(option, param: string) {
    this.openAuto = false;
    if (param === 'skills') {
      this.chipsSkills.push({name: option.name});
      this.selected.push({value: option.value});
      this.selectedTagsId.push(option.value);
      this.goToNextPage = true;
      if (this.chipsSkills.length === 2) {
      this.isTagsSkills = false;
    }
    } else if (param === 'goals') {
      this.chipsGoals.push({name: option.name});
      this.selected.push({value: option.value});
      this.selectedTagsId.push(option.value);
      this.goToNextPage = true;
      if (this.chipsGoals.length === 2) {
        this.isTagsGoals = false;
      }
    } else if (param === 'interests'){
      this.chipsInterest.push({name: option.name});
      this.selected.push({value: option.value});
      this.selectedTagsId.push(option.value);
      this.goToNextPage = true;
      if (this.chipsInterest.length === 2) {
      this.isTagsInterests = false;
    }
  }
}

  public goNext(page: string){
    let params = {};
    this.goToNextPage = false;
    this.activePage = page;
    this.chipsSkills = [];
    if (page === 'goals' ) {
      this.newTags.length !== 0 ? params = {selectedTagsId: this.selectedTagsId, newTags: this.newTags}
      : params = {selectedTagsId: this.selectedTagsId};
      this.postNewData(params, 'skill');
      console.log('params', params);
      this.newTags = [];
      this.selectedTagsId = [];
      this.selected = [];
    } else if (page === 'interests') {
      this.newTags.length !== 0 ? params = {selectedTagsId: this.selectedTagsId, newTags: this.newTags}
      : params = {selectedTagsId: this.selectedTagsId};
      this.postNewData(params, 'goal');
      this.newTags = [];
      this.selectedTagsId = [];
      this.selected = [];
    } else if (page === 'done') {
      this.newTags.length !== 0 ? params = {selectedTagsId: this.selectedTagsId, newTags: this.newTags}
      : params = {selectedTagsId: this.selectedTagsId};
      this.postNewData(params, 'interest');
      this.newTags = [];
      this.selectedTagsId = [];
      this.selected = [];
      this.router.navigate(['/home']);
    }
  }


  public setSearch(query: string): void {
    if (this.activePage === 'skills' || this.activePage === 'goals') {
      this.options = this.tagsSkills;
      const search = _.filter(this.tagsSkills, o => _.includes(o.srchStr, query));
      this.openAuto = true;
      if (this.selected.length !== 0) {
        const result = _.differenceBy(search, this.selected, 'value');
        this.options = result;
      } else {
        this.options = search;
      }
      if (this.options.length === 0) {
        this.openAuto = false;
        this.showBtn = true;
      }
    } else if (this.activePage === 'interests') {
      this.options = this.tagsInterests;
      const search = _.filter(this.tagsInterests, o => _.includes(o.srchStr, query));
      this.openAuto = true;
      if (this.selected.length !== 0) {
        const result = _.differenceBy(search, this.selected, 'value');
        this.options = result;
      } else {
        this.options = search;
      }
      if (this.options.length === 0) {
        this.openAuto = false;
        this.showBtn = true;
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
        } else {

        }
      });
  }

  // HTTP req
  private postNewData (params: any, infoType: string) {
    console.log(params, infoType);
    this.data.postInitInfo(params, infoType).subscribe(
      (data: types.ApiResponse) => {this.checkStatusData(data); } ,
      error => this.getErrorCodeApi(error.status, error.error));

  }
  //  Check on error, show details of error
getErrorCodeApi(data: number, message: string): void {
  const result = _.find(this.ERROR_API, function(o) { return o.code === data; });
  if (data === 500 ) {
  }
}
checkStatusData(data: any): void {
  if (data) {
  console.log(data);
  }
}
public onReset(event): void {

}
}
