import { TransferService } from 'src/app/services/transfer.service';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { Store} from '@ngrx/store';
import { LoadUserData } from '../../state/actions/user.actions';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: types.User = {} as types.User;
  public user$: Observable<types.User>;
  private unsubscribe$: Subject<void> = new Subject<void>();

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
    const storeSub$ = this.store.select('user').subscribe((state: any) => {
      this.user = state;
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
