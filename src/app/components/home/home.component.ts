import { TransferService } from 'src/app/services/transfer.service';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, Input } from '@angular/core';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { Store} from '@ngrx/store';
import { LoadUserData } from '../../state/actions/user.actions';
import { LoadTags } from '../../state/actions/filters.actions'
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() user: types.NewUser = {} as types.NewUser;
  @Output() arrTags: types.TagsArr = {} as types.TagsArr;
  public user$: Observable<types.NewUser>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  @Input() dataNotSet: boolean = true;
  @Output() userUploaded: boolean = false;
  @Output() activePage: string;

  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.getDataFromLocalStorage('user');
    this.getUserData();
  }
  private getTocken() {
    const paramsForReq = {token: this.sessionStorageService.getValue('_token'),
    tokenType: this.sessionStorageService.getValue('tokenType')};
  }

  private getUserData() {
    this.store.dispatch(new LoadUserData());
    this.store.dispatch(new LoadTags());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state){
        this.user = state;
        console.log(this.user);
        this.userUploaded = true;
        if(this.user.keyData.skills.length == 0 || this.user.keyData.skills == null){
          this.dataNotSet = true;
          this.activePage = "skills";
        } else if (this.user.keyData.goals.length == 0 || this.user.keyData.goals == null){
          this.dataNotSet = true;
          this.activePage = "goals";
        } else if(this.user.keyData.interests.length == 0 || this.user.keyData.interests == null){
          this.dataNotSet = true;
          this.activePage = "interests";
        }
        
      }
    });

    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if(state !== undefined || state){
        this.arrTags = state;
        console.log('this.arrTags', this.arrTags);
      }
    });
  }

  getDataFromLocalStorage (key: string) {
    const dataStorage = this.sessionStorageService.getValue("_token");
    const dataLocal = this.localstorageService.getValue(key);
    if((dataLocal === "" || dataLocal === null || !dataLocal) && (dataStorage === null || dataStorage === "")){
    this.router.navigate(['/login']);
    } 
  }
}
