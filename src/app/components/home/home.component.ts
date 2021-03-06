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
import { LoadUserData, UpdateUser } from '../../state/actions/user.actions';
import { LoadTags } from '../../state/actions/filters.actions';
import {Observable, Subject} from 'rxjs';
import { StompWsService } from '../../services/stomp-ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public user: types.NewUser = {} as types.NewUser;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private dataNotSet: boolean;
  @Output() userUploaded: boolean = false;
  @Output() activePage: string;
  @Output() tags: any;
  webSocketAPI: StompWsService;


  constructor(
    private actRoute: ActivatedRoute,
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    public router: Router,
    private transferService: TransferService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.getDataFromLocalStorage('user');
    this.getFilters();
    this.getUserData();
    this.onSockets();
  }
  public onSockets(): void {
    this.webSocketAPI = new StompWsService(this.store);
    this.webSocketAPI._connect();
  }
    private getUserData() {
      this.store.dispatch(new LoadUserData());
      const newUser$ = this.store.select('user').subscribe((state: any) => {
        if (state && typeof state != 'undefined') {
          this.user = state;
          this.userUploaded = true;
          if((this.user.keyData.skills.length === 0 ||
            this.user.keyData.skills == null) &&
            this.user.keyData.skillsSkipped === false) {
            this.dataNotSet = true;
            this.router.navigate(['/main/set-exactdata']);
          } else if ((this.user.keyData.goals.length === 0 ||
            this.user.keyData.goals == null)
            && this.user.keyData.goalsSkipped === false) {
            this.dataNotSet = true;
            this.router.navigate(['/main/set-exactdata']);
          } else if(this.user.keyData.interests.length === 0 ||
            this.user.keyData.interests == null) {
            this.dataNotSet = true;
            this.router.navigate(['/main/set-exactdata']);
          } else {
            this.dataNotSet = false;
          }
        }
      });
  }

  private getFilters() {
    this.store.dispatch(new LoadTags());
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if (state !== undefined || state) {
        this.tags = state;
      }
    });
  }

  getDataFromLocalStorage (key: string) {
    const dataStorage = this.sessionStorageService.getValue("_token");
    const dataLocal = this.localstorageService.getValue(key);
    if((dataLocal === "" || dataLocal === null || !dataLocal) && (dataStorage === null || dataStorage === "")){
    this.router.navigate(['']);
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.webSocketAPI._disconnect();
  }
}
