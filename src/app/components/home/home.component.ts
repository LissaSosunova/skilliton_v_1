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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: types.User = {} as types.User;

  constructor(
    private data: HttpService,
    private sessionStorageService: SessionstorageService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    // this.user = this.transferService.dataGet('user');
    // console.log(this.user);

    this.getUserData();
  }
  private getTocken() {
    const paramsForReq = {token: this.sessionStorageService.getValue('_token'),
    tokenType: this.sessionStorageService.getValue('tokenType')};
  }

  private getUserData() {
    this.data.getUser().subscribe(
      (data: types.User) => {this.checkStatusData(data);},
      error => this.getErrorCodeApi(error.status, error.error))
  }

  getErrorCodeApi(data: number, message: string): void {
    console.log(data, message);
    // let result = _.find(this.ERROR_API, function(o) { return o.code == data; });
    // this.showError = true;
    // // this.showErrorText = result.title + message;
    // this.showErrorText =  result.title + message;
  }
  checkStatusData(data: any): void{
    console.log(data);
    
  }
}
