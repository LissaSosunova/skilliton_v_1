import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { Store} from '@ngrx/store';
import { LoadUserData, UpdateUsersServices } from '../../../state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { StompWsService } from '../../../services/stomp-ws.service';
import { types } from '../../../types/types';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit {
  @Output() activeTopBtn: 'myMatches';
  public recomendations: Array<any>;
  public notifications: types.Notifications;
  webSocketAPI: StompWsService;
  constructor(
    private data: HttpService,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.init();
    this.onSockets();
  }
  init() {
    this.notifications = {
      ignored: [],
      deferred: [],
      system: [],
      chats: [],
      active: []
    }
    this.data.getRecomendations().subscribe((data) => {
      // console.log(data);
    })
  }

  public onSockets(): void {
    this.webSocketAPI = new StompWsService(this.store);
    this.webSocketAPI._connect();
    this.getNotifications();
  }

  public getNotifications(): void {
    setTimeout(() => {
      const notify$ = this.store.select('user').subscribe((state: any) => {
        if(state !== undefined) {
          this.notifications = state.notifications;
          console.log(this.notifications);
        }
      });
    }, 5000);
    
  }

  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }
}
