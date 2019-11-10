import { types } from '../../types/types';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment  } from '@angular/router';
import { Store} from '@ngrx/store';
import { LoadMates } from '../../state/actions/mate.actions';
import { Observable, Subject, Subscription } from 'rxjs';
import { RouterService } from '../../services/router.service';
import { HttpService } from '../../services/http.service';
import { LoadUserData, UpdateUsersGoals } from '../../state/actions/user.actions';

@Component({
  selector: 'app-veiw-profile',
  templateUrl: './veiw-profile.component.html',
  styleUrls: ['./veiw-profile.component.scss']
})
export class VeiwProfileComponent implements OnInit {
  public user: types.NewUser = {} as types.NewUser;
  public mateEmail: string;
  public activeUrl: string;
  private userUploaded: boolean = false;
  private mateUploaded: boolean = false;
  public mate: any;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private routerService: RouterService,
    private store: Store<any>,
    private data: HttpService,
  ) { }

  ngOnInit() {
    this.getUserData();
    this.getCurrentRoute();
    this.getMate();
  }

  private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split(';mate=');
      this.mateEmail = urlSegments[1];
      this.activeUrl = urlSegments[0];
    });
   }

   private getUserData() {
    this.store.dispatch(new LoadUserData());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.userUploaded = true;
      }
    });
  }

  public getMate () {
    const mate$ = this.store.select('mateProfile').subscribe((state: types.ViewProfile) => {
        if  (state !== undefined)  {
          this.mate = state;
          if (this.mate.keyData.interests.length !== 0 ) {
            this.mateUploaded = true;
          }
        } else {
          this.data.getMate(this.mateEmail).subscribe((data) => {
            if (data.error === false || data.status === 200) {
              this.store.dispatch(new LoadMates(data));
              this.mate = data.data;
              this.mateUploaded = true;
            }
          });
        }
      });
  }

}
