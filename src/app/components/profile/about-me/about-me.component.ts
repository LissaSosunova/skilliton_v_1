import {Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {Store} from '@ngrx/store';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LoadUserData } from '../../../state/actions/user.actions';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  public user: Observable<types.NewUser>;
  @Input() myGoals = [] as any;
  public activeUrl: string = '/profile/about-me';
  @Input() currTab: string;
  @Input() userUploaded: boolean = false;
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;

  constructor(
    private data: HttpService,
    private router: Router,
    private transferService: TransferService,
    private store: Store<types.NewUser>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.init();
  }


  private init(): void {
    this.store.dispatch(new LoadUserData());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.userUploaded = true;
      }
    });
  }

}
