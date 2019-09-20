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

  public query: types.FindTag;
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
  @Output() tagsSkills = [] as  any;
  @Output() tagsInterest = [] as  any;
  @Output() chipsSkills = [] as  any;
  @Output() chipsGoals = [] as  any;
  @Output() chipsInterest = [] as  any;
  @Output() selectedTagsId = [] as  any;
  
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

  init(){
    this.store.dispatch(new LoadTags());
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if(state !== undefined || state){
        this.TAGS = state.tagsArr;
        this.tagsSkills = state.tagsSkills;
      }
    });
  }

  public setValue(val){
    if(val !== null){
      setTimeout(() => {
        this.chipsSkills.push({name: val});
        this.goToNextPage = true;
        this.openAuto = false;
        if(this.chipsSkills.length === 5){
          this.isTagsSkills = false;
        }
      });
    }
  }
    public setValueFromDropDown(option, param: string) {
    this.openAuto = false;
    if(param === 'skills'){
      this.chipsSkills.push({name: option.name});
      this.selectedTagsId.push(option.value)
      this.goToNextPage = true;
      if(this.chipsSkills.length === 5){
      this.isTagsSkills = false;
    }
    } else if(param === 'goals'){
      this.chipsGoals.push({name: option.name});
      this.selectedTagsId.push(option.value)
      this.goToNextPage = true;
      console.log(this.chipsInterest);
      if(this.chipsGoals.length === 5){
        this.isTagsGoals = false;
      }
    } else if(param === 'interests'){
      this.chipsInterest.push({name: option.name});
      this.selectedTagsId.push(option.value)
      this.goToNextPage = true;
      console.log(this.chipsInterest);
      if(this.chipsInterest.length === 5){
      this.isTagsInterests = false;
    }
  }
}

  public goNext(page: string){
    this.goToNextPage = false;
    this.activePage = page;
    this.chipsSkills = [];
    if(page === "goals"){
      this.selectedTagsId = [];
      console.log('send data of skills');
    } else if (page === "interests"){
      this.selectedTagsId = [];
      console.log('send data of goals');
    } else if (page === "done"){
      this.selectedTagsId = [];
      console.log('send data of interests and get new user');
    }
  }


  public setSearch(query: string): void {
    this.query = {
      query: query
    };
    this.options = this.tagsSkills;
    const result = _.filter(this.tagsSkills, o => _.includes(o.name, query))
    this.openAuto = true;
    this.options = result;
    if(result.length === 0){
      this.openAuto = false;
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
  let result = _.find(this.ERROR_API, function(o) { return o.code == data; });
  console.log(data, message);
  if(data===500){
   
  }
}
checkStatusData(data: any): void{
  if(data){
  console.log(data);
  }
}
public onReset(event): void {

}
}
