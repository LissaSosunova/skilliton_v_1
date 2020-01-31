import { ChatWindowComponent } from './chat-window/chat-window.component';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { LoadChats } from '../../state/actions/chats.actions';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

public chatsUploaded: boolean = false;
@Output() public chatList: Observable<any>;
@Output() public requestsList: Observable<any>;
@Output() public typeChat: string;
private unsubscribe$: Subject<void> = new Subject<void>();
public chatsExsist: BehaviorSubject<boolean>;
public requestsExsist: BehaviorSubject<boolean>;
@Output() public chatId: BehaviorSubject<number>;
@Input() public chatWidth: string;
@Input() public $updateChatList: boolean = false;
public chatWindowWidth: string;

  constructor(
    private router: Router,
    private store: Store<any>,
    private chatService: ChatsService
  ) { }

  ngOnInit() {
    this.chatsExsist = new BehaviorSubject(false);
    this.requestsExsist = new BehaviorSubject(false);
    this.chatId = new BehaviorSubject(null);
    this.getChatsList();
    this.chatWidth = 'col-xs-4 no-padd';
  }

  public setChatWidth(width): void {
    this.chatWidth = width;
  }

  public goToChat(id: number): void {
    this.chatId.next(id);
  }

  public getChatsList() {
    this.chatService._getChatList();
    const chats$ = this.store.select('chats').subscribe((state: any) => {
      if (state.chatList.length !== 0 ) {
        this.chatList = state.chatList;
        this.chatsExsist.next(true);
      }
      if (state.requests.length !== 0 ) {
        this.requestsList = state.requests;
        this.requestsExsist.next(true);
      }
      this.chatsUploaded = true;
      }
     );
  }
}
