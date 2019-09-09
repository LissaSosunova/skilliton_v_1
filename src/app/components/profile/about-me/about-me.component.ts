import {Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  public user: types.User = {} as types.User;
  public user$: Observable<types.User>;

  constructor(
    private data: HttpService,
    private router: Router,
    private transferService: TransferService
  ) { }

  ngOnInit() {
    this.init();
  }


  private init(): void {
    this.user = this.transferService.dataGet("user");
    // this.user$ = this.store.pipe(select('user'));
    // this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
    //   this.user = user;
    // });
    
    
  }

}
