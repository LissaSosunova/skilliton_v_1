import { Component, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Store } from '@ngrx/store';
import { RouterService } from 'src/app/services/router.service';
import { LoadUserData } from '../../../state/actions/user.actions';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit {
  @Output() activeTopBtn: 'myMatches';
  @Output() user: any;
  @Output() userIncomingMatches = [] as any;
  private incomUploaded: boolean = false;
  private openIncome: boolean = false;
  @Output() userOutcomingMatches = [] as any;
  private outcomUploaded: boolean = false;
  private openOutcome: boolean = false;
  @Output() userActiveMatches = [] as any;
  private activeUploaded: boolean = false;
  private openActive: boolean = false;
  @Output() userRecomendations = [] as any;
  private recomedationsUploaded: boolean = false;
  private openRecomendations: boolean = false;
  @Output() userInterested = [] as any;
  private interestedUploaded: boolean = false;
  private openInterested: boolean = false;

  constructor(
    private data: HttpService,
    private routerService: RouterService,
    private store: Store<any>,
) { }

  ngOnInit() {
    this.getDataForMatches();
    this.uploadUserFromState();
    // Заглушки для рекомендаций
    this.userRecomendations = [];
    this.recomedationsUploaded = true;
  }
  public uploadUserFromState() {
    this.store.select('user').subscribe((state) => {
      if (state !== undefined) {
        this.user = state;
        this.userInterested = this.user.contacts;
        this.interestedUploaded = true;
      }
    })
  }
  public getDataForMatches() {
    this.data.getIncomingMatches().subscribe((data) => {
      this.userIncomingMatches = data.data;
      this.incomUploaded = true;
    });
    this.data.getOutcomingMatches().subscribe((data) => {
      this.userOutcomingMatches = data.data;
      this.outcomUploaded = true;
    });
    this.data.getActiveMatches().subscribe((data) => {
      this.userActiveMatches = data.data;
      this.activeUploaded = true;
    });
  }
  openOut() {
    this.openOutcome = !this.openOutcome;
  }
  openIn() {
    this.openIncome = !this.openIncome;
  }
  openAct() {
    this.openActive = !this.openActive;
  }
  openRec() {
    this.openRecomendations = !this.openRecomendations;
  }
  openInt() {
    this.openInterested = !this.openInterested;
  }

  onChanged(chengeType:any){
    if (chengeType === true) {
      this.getDataForMatches();
    }
  }
  onChangedPerson(mail:any) {
    this.data.getSubscriptionMate(mail, false).subscribe((resp) => {
      if (resp.error == false) {
        this.store.dispatch(new LoadUserData());
        this.uploadUserFromState();
      }
    });
  }
}
