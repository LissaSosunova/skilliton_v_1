import {Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {Store} from '@ngrx/store';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Input() user: types.NewUser;
  @Input() myGoals = [] as any;
  public currTab: string;
  @Input() userUploaded: boolean = false;
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;

  constructor(
    private data: HttpService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<types.NewUser>,
  ) { }

  ngOnInit() {
    this.init();
  }


  private init(): void {
    if(this.currTab === undefined){
      this.currTab = 'general';
    }
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
