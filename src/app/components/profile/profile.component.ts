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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: types.User = {} as types.User;
  public transferData: any;
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
    if(!this.transferData || this.transferData == null){
      this.getUserData();
    } else {
      this.user = this.transferData;
      console.log(this.user);
    }

  }

  private getUserData() {
    this.data.getUser().subscribe(
      (data: types.User) => {this.checkStatusData(data);},
      error => this.getErrorCodeApi(error.status, error.error))
  }

  getErrorCodeApi(data: number, message: string): void {
    if(data === 401){
      this.router.navigate(['/login']);
    }
  }
  checkStatusData(data: any): void{
    this.user = data;
    this.transferService.dataSet({name:'user', data: this.user});
    console.log(this.user);
  }

}
