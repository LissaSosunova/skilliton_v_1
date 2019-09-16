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


@Component({
  selector: 'app-set-exactdata-page',
  templateUrl: './set-exactdata-page.component.html',
  styleUrls: ['./set-exactdata-page.component.scss']
})
export class SetExactdataPageComponent implements OnInit {
  @Input() user: types.NewUser;
  @ViewChild('skillsDataForm', { static: false }) public skillsDataForm: NgForm;
  @Input() arrTags: Array<any> = [];
  public query: types.FindTag;
  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  private createNewTagParams: types.PostTag;
  private ERROR_API: any = errorTypes.api.login;
  private ERROR_APP: any = errorTypes.app.login;
  private goToNextPage: boolean = false;
  private isTags:  boolean = false;
  private skills: any;
  
  @Input() activePage: string;
  constructor(
    private data: HttpService
  ) { }

  ngOnInit() {
    this.initSearchForm();
    console.log(this.activePage);
  }

  public setValue(value: string){
    this.skills = value;
    this.goToNextPage = true;
    
  }

  public goNext(page: string){
    this.goToNextPage = false;
    this.activePage = page;
  }

  searchInTags(value: string): void{
    const result = _.find(this.arrTags, function(o) { 
      console.log(o);
      return o.tagName == value && o.categoryId !== null; });
    console.log(result);
  }

  public setSearch(query: string): void {
    this.query = {
      query: query
    };
    const result = _.filter(this.arrTags, o => _.includes(o.tagName, query))
    if(result !== undefined){
      this.isTags == true;
      this.arrTags = result;
      console.log(result);
      return ;
    } else {
      console.log(result);
      this.createNewTagParams = {
        category: true,
        categoryId: 100,
        name: query,
        status: ''
      }
      this.data.postTags(this.createNewTagParams).subscribe(
        (data) => {this.checkStatusData(data);},
        error => this.getErrorCodeApi(error.status, error.error))
      
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

}
