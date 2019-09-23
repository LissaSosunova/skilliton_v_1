import {  NgForm, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { errorTypes } from '../../../shared/constants/errors';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { types } from '../../../types/types';
import {Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import { LoadTags } from '../../../state/actions/filters.actions';
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
  public options: any;
  public TAGS: any;

  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  private createNewTagParams: types.PostTag;
  private ERROR_API: any = errorTypes.api.login;
  private ERROR_APP: any = errorTypes.app.login;
  private goToNextPage: boolean = false;
  private isTagsSkills:  boolean = true;
  private isTagsGoals:  boolean = true;
  private isTagsInterests:  boolean = true;
  private skills: any;
  private openAuto: boolean = false;
  private showBtn: boolean = false;
  @Output() tagsSkills = [] as  any;
  @Output() tagsInterests = [] as  any;
  @Output() chipsSkills = [] as  any;
  @Output() chipsGoals = [] as  any;
  @Output() chipsInterest = [] as  any;
  @Output() selectedTagsId = [] as  any;
  @Output() dataNotSet: boolean = true;
  @Input() activePage: string;
  @Input() valueSearch: any;
  constructor(
    private data: HttpService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.initSearchForm();
    this.init();
  }

  init() {
    this.store.dispatch(new LoadTags());
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if (state !== undefined || state) {
        this.TAGS = state.tagsArr;
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
      this.selectedTagsId.push({value: option.value});
      this.goToNextPage = true;
      if (this.chipsSkills.length === 2) {
      this.isTagsSkills = false;
    }
    } else if (param === 'goals') {
      this.chipsGoals.push({name: option.name});
      this.selectedTagsId.push({value: option.value});
      this.goToNextPage = true;
      if (this.chipsGoals.length === 2) {
        this.isTagsGoals = false;
      }
    } else if (param === 'interests'){
      this.chipsInterest.push({name: option.name});
      this.selectedTagsId.push({value: option.value});
      this.goToNextPage = true;
      if (this.chipsInterest.length === 2) {
      this.isTagsInterests = false;
    }
  }
}

  public goNext(page: string){
    this.goToNextPage = false;
    this.activePage = page;
    this.chipsSkills = [];
    if (page === 'goals') {
      this.selectedTagsId = [];
      console.log('send data of skills');
    } else if (page === 'interests') {
      this.selectedTagsId = [];
      console.log('send data of goals');
    } else if (page === 'done') {
      this.selectedTagsId = [];
      console.log('send data of interests and get new user');
      return this.dataNotSet = false;
    }
  }


  public setSearch(query: string): void {
    if (this.activePage === 'skills' || this.activePage === 'goals') {
      this.options = this.tagsSkills;
      const search = _.filter(this.tagsSkills, o => _.includes(o.srchStr, query));
      this.openAuto = true;
      if (this.selectedTagsId.length !== 0) {
        const deleteId = this.selectedTagsId;
        const result = _.differenceBy(search, this.selectedTagsId, 'value');
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
      const result = _.filter(this.tagsInterests, o => _.includes(o.srchStr, query));
      this.openAuto = true;
      this.options = result;
      if (result.length === 0) {
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
