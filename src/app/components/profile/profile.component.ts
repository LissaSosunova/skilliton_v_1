import { TransferService } from 'src/app/services/transfer.service';
import { types } from 'src/app/types/types';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Router, ActivatedRoute, UrlSegment  } from '@angular/router';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { UserSubService } from 'src/app/services/user-sub.service';
import { Store} from '@ngrx/store';
import { LoadUserData } from 'src/app/state/actions/user.actions';
import { LoadTags } from 'src/app/state/actions/filters.actions';
import { Observable, Subject, Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { HttpService } from '../../services/http.service';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() user: types.NewUser = {} as types.NewUser;
  @Output() userUploaded: boolean = false;
  @Output() dataNotSet: boolean = true;
  @Output() myGoals = [] as any;
  public activeTopBtn: string;
  public transferData: any;
  public activeUrl: any;
  public currParentUrl: string;
  @ViewChild('currChildUrl', {static: false}) public currChildUrl: string;
  @ViewChild('uploadFile', {static: true}) public uploadFile: ElementRef;
  subscription: Subscription;
  public name: string;
  public lastName: string;
  public summary: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private avatarService: AvatarService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private routerService: RouterService,
    private sessionStorageService: SessionstorageService,
    private store: Store<any>,
    private transferService: TransferService,
    private userSubService: UserSubService,
    private data: HttpService,
  ) { }

  ngOnInit() {
    this.getUserData();
    this.activeTopBtn = 'aboutMe';
    this.getCurrentRoute();
    if (this.currChildUrl === 'about-me') {
      this.activeUrl = '/profile/about-me';
    } else if ((this.currChildUrl === 'skills-to-obtaine')) {
      this.activeUrl = '/profile/skills-to-obtaine';

    } else if (this.currChildUrl === '') {
      this.activeUrl = 'parentUrl';
    }

  }

  private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/');
      this.currParentUrl = urlSegments[1];
      if (this.currParentUrl === '/' || !this.currParentUrl) {
        this.currParentUrl = 'login';
        const token = this.sessionStorageService.getValue('_token');
        if (token) {
          this.currParentUrl = 'main';
        }
      }
      if (urlSegments.length > 2) {
        this.currChildUrl = urlSegments[2];
        console.log(this.currChildUrl);
        const childSegments = this.currChildUrl.split('?');
        this.currChildUrl = childSegments[0];
      } else {
        this.currChildUrl = '';
      }
    });
   }

  private getUserData() {
    this.store.dispatch(new LoadUserData());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.name = this.user.profile.name;
        this.lastName = this.user.profile.lastName;
        this.summary = this.user.profile.profileSummary;
        this.userUploaded = true;
        this.myGoals = this.user.keyData.goals;
      }
    });
  }

  public goToSubUrl(url: string) {
    this.activeUrl = url;
    this.router.navigate([url]);
    this.getCurrentRoute();
  }

  getErrorCodeApi(data: number, message: string): void {
    if (data === 401) {
      this.router.navigate(['/login']);
    }
  }
  checkStatusData(data: any): void{
    this.user = data;
    this.transferService.dataSet({name:'user', data: this.user});
  }
  public uploadAvatar(event): void {
    const files = this.uploadFile.nativeElement.files;
    const formData: FormData = new FormData();
    formData.append('image', files[0]);
    const params = {formData: formData}
    console.log(params);
    // this.data.uploadAvatar(params).subscribe((res) => {
    //   const avatar: types.Avatar = this.avatarService.parseAvatar(res);
    //   console.log(avatar);
    // //   this.store.dispatch(new userAction.UpdateAvatarURL(avatar));
    // // }, err => {
    // //   console.log(err);
    // //   // this.toastService.openToastFail('Error in uploading avatar');
    // });
  }
}
