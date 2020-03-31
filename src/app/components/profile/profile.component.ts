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
import { Observable, Subject, Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { HttpService } from '../../services/http.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { EditUserProfileService } from '../../services/edit-user-profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,  OnDestroy {
  @Input() user: types.NewUser = {} as types.NewUser;
  @Output() userUploaded: boolean = false;
  @Output() dataNotSet: boolean = true;
  @Input() myGoals = [] as any;
  @Output() goals: Observable<any>;
  @Output() mySkills = [] as any;
  @Output() langs = [] as any;
  public myInterests: Array<any>;
  public activeTopBtn: string;
  public transferData: any;
  public activeUrl: any;
  public langsNative: any;
  public myServices: Array<any>;
  public currParentUrl: string;
  @ViewChild('currChildUrl') public currChildUrl: string;
  @ViewChild('summaryValue', {static: true}) public summaryValue: string;
  @ViewChild('profileStatus', {static: true}) public profileStatus: string;
  @ViewChild('uploadFile', {static: true}) public uploadFile: ElementRef;
  subscription: Subscription;
  public name: string;
  public lastName: string;
  public summary: string;
  public profileSt: string;
  public placeOfBirth: any;
  public placeOfResidence: any;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public openSummaryTextarea: boolean = false;
  public openProfileStatusTextarea: boolean = false;
  public counter: number;


  constructor(
    private actRoute: ActivatedRoute,
    private avatarService: AvatarService,
    private localstorageService: LocalstorageService,
    public router: Router,
    private routerService: RouterService,
    private sessionStorageService: SessionstorageService,
    private store: Store<any>,
    private transferService: TransferService,
    private userSubService: UserSubService,
    private data: HttpService,
    private editData: EditUserProfileService,
  ) { }

  ngOnInit() {
    this.getUserData();
    this.activeTopBtn = 'aboutMe';
  }

  private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/');
      this.currParentUrl = urlSegments[1];
      if (urlSegments.length > 2) {
        this.currChildUrl = urlSegments[2];
        const childSegments = this.currChildUrl.split('?');
        this.currChildUrl = childSegments[0];
      } else {
        this.currChildUrl = '';
      }
    });
   }



  private getUserData() {
    const newUser$ = this.store.select('user').subscribe((state: any) => {
      if  (state !== undefined)  {
        this.user = state;
        if  (state !== undefined || state && state.skills.length > 1)  {
          this.goals = state.keyData.goals;
        }
        this.counter = 12.5;
        this.name = state.profile.name;
        this.lastName = state.profile.lastName;
        this.summary = this.user.profile.profileSummary;
        this.profileSt = this.user.profile.profileStatus;
        if (this.profileSt !== '') {
          this.profileStatus = this.profileSt;
        }
        if (this.summary !== '') {
          this.summaryValue = this.summary;
          this.counter = this.counter + 12.5;
        }
        this.myGoals = this.user.keyData.goals;
        this.myServices = this.user.keyData.services;
        this.placeOfBirth = this.user.profile.placeOfBirth;
        this.placeOfResidence = this.user.profile.placeOfResidence;
        this.user.profile.profileSummary !== null ?
        this.counter = this.counter + 12.5 : this.counter = this.counter;
        this.user.profile.placeOfBirth !== null ?
        this.counter = this.counter + 12.5 : this.counter = this.counter;
        this.user.profile.placeOfResidence !== null ?
        this.counter = this.counter + 12.5 : this.counter = this.counter;
        this.user.profile.langs.other.length !== 0 ?
        this.counter = this.counter + 12.5 : this.counter = this.counter;
        this.user.profile.langs.native.length !== 0 ?
        this.counter = this.counter + 12.5 : this.counter = this.counter;
        this.user.keyData.education.length !==0 ? 
        this.counter = this.counter + 12.5 : this.counter = this.counter;
        this.langsNative = this.user.profile.langs.native;
        this.langs = this.user.profile.langs.other;
        this.mySkills = this.user.keyData.skills;
        this.myInterests = this.user.keyData.interests;
        this.userUploaded = true;
      }
    });
  }

  public goToSubUrl(url: string) {
    this.activeUrl = url;
    if (url === '/main/profile/matches'){
      this.activeTopBtn = 'myMatches';
    } else if (url === '/main/profile') {
      this.activeTopBtn = 'aboutMe';
    }
    this.router.navigate([url]);
    this.getCurrentRoute();
  }
  openEditSummary() {
    this.openSummaryTextarea = !this.openSummaryTextarea;
  }
  openEditProfileSt() {
    this.openProfileStatusTextarea = !this.openProfileStatusTextarea;
  }
  saveNewSummary(newVal) {
    if(newVal !== null) {
      this.editData.sendData('profileSummary', newVal);
      this.openSummaryTextarea = false;
    }
  }
  saveNewProfileStatus(newVal) {
    if(newVal !== null && newVal !== '') {
      this.editData.sendData('profileStatus', newVal);
      this.openProfileStatusTextarea = false;
    }
  }
  cancelEditSumm() {
    this.openSummaryTextarea = false;
  }
  cancelEditProfileStatus() {
    this.openProfileStatusTextarea = false;
  }
  getErrorCodeApi(data: number, message: string): void {
    if (data === 401) {
      this.router.navigate(['']);
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
    const params = {formData: formData};
    // this.data.uploadAvatar(params).subscribe((res) => {
    //   const avatar: types.Avatar = this.avatarService.parseAvatar(res);
    //   console.log(avatar);
    // //   this.store.dispatch(new userAction.UpdateAvatarURL(avatar));
    // // }, err => {
    // //   console.log(err);
    // //   // this.toastService.openToastFail('Error in uploading avatar');
    // });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
