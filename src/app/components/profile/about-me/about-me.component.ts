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
import { RouterService } from 'src/app/services/router.service';

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
  @Output() user$: any;
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;
  public currParentUrl: string;
  public currChildUrl: string;

  constructor(
    private data: HttpService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private routerService: RouterService,
    private store: Store<types.NewUser>,

  ) { }

  ngOnInit() {
    this.init();
    this.getCurrentRoute();
  }


  private init(): void {
    this.store.dispatch(new LoadUserData());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.user$ = this.user;
        this.userUploaded = true;
      }
    });
  }

  private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/');
      this.currParentUrl = urlSegments[2];
      if (urlSegments.length > 2) {
        this.currChildUrl = urlSegments[3];
      } else {
        this.currChildUrl = '';
      }
    });
   }

}
