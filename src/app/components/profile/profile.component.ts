import { TransferService } from 'src/app/services/transfer.service';
import { types } from '../../types/types';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input, Output } from '@angular/core';
import { errorTypes } from '../../shared/constants/errors';
import { HttpService } from '../../services/http.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { Store} from '@ngrx/store';
import { LoadUserData } from '../../state/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() user$: types.User = {} as types.User;
  public user: types.User = {} as types.User;
  public transferData: any;
  public transferChildUrl: any;
  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<any>
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
      this.user$ = this.user;
      this.router.navigate(['profile/about-me']);
    }

  }

  private getUserData() {
    this.store.dispatch(new LoadUserData());
    const storeSub$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined){
        this.user = state;
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

}
