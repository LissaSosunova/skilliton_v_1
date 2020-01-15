import { LoadCurrentChat } from './../../../state/actions/chats.actions';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, Input } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
@Input() public chatId?: number;
public chat: Observable<any>;
public chatUploader: boolean = false;

  constructor(
    private data: HttpService,
    private router: Router,
    private routerService: RouterService,
    private store: Store<any>
  ) { }

  ngOnInit() {

    if (typeof this.chatId !== 'number') {
      this.getChatId();
      this.getChat();
    } else {
      this.store.dispatch(new LoadCurrentChat(this.chatId));
      this.getChat();
    }
  }
  private getChatId() {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/chats/chat-window/');
      const currentCHatId = urlSegments[1];
      this.chatId = +currentCHatId;
      if (isNaN(this.chatId) === false) {
        this.store.dispatch(new LoadCurrentChat(this.chatId));
      }
    });
  }

  private getChat(): any {
    const chat$ = this.store.select('chats').subscribe((state: any) => {
      if (state.currChat) {
        this.chat = state.currChat;
        this.chatUploader = true;
      }
      });
  }
}
