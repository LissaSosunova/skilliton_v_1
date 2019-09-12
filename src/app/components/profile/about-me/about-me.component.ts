import {Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  public user: types.User = {} as types.User;
  public currTab: string;
  

  constructor(
    private data: HttpService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<types.User>,
  ) { }

  ngOnInit() {
    this.init();
  }


  private init(): void {
    if(this.currTab === undefined){
      this.currTab = 'general';
    }
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined){
        this.user = state;
        console.log(this.user)
      }
    });
  }

  public switcher(currId: string): void {
    this.router.navigate([], {
      queryParams: {
        currTab: currId
      }
    });
    this.currTab = currId;
  }

}
