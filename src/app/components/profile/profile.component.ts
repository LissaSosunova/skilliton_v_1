import { TransferService } from 'src/app/services/transfer.service';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { Store} from '@ngrx/store';
import { LoadUserData } from '../../state/actions/user.actions';
import { Observable, Subject, Subscription } from 'rxjs';
import {UserSubService} from '../../services/user-sub.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() user: types.NewUser = {} as types.NewUser;
  @Output() userUploaded: boolean = false;
  @Output() dataNotSet: boolean = true;
  public transferData: any;
  public transferChildUrl: any;
  subscription: Subscription;
  name: string;
  lastName: string;
  summary: string;
  constructor(
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<any>,
    private userSubService: UserSubService
  ) { }
  ngOnInit() {
    this.getTranferUserData();
  }

  public getTranferUserData(): void {
    this.transferData = this.transferService.dataGet('user');
    this.transferChildUrl = this.transferService.dataGet('childUrl');
    if(!this.transferData || this.transferData == null){
      this.getUserData();
    } else {
      this.user = this.transferData;
    }

    if(!this.transferChildUrl || this.transferChildUrl == null){
      this.router.navigate(['profile/about-me']);
    }

  }

  private getUserData() {
    this.store.dispatch(new LoadUserData());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state){
        this.user = state;
        this.setUser(this.user);
        this.name = this.user.profile.name;
        this.lastName = this.user.profile.lastName;
        this.summary = this.user.profile.profileSummary;
        this.userUploaded = true;
      }
    });
  }

  setUser(user: any) {
    this.subscription = this.userSubService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    }



  getErrorCodeApi(data: number, message: string): void {
    if(data === 401){
      this.router.navigate(['/login']);
    }
  }
  checkStatusData(data: any): void{
    this.user = data;
    this.transferService.dataSet({name:'user', data: this.user});
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
