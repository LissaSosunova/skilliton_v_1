import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../../../services/router.service';
import { Store} from '@ngrx/store';
import { LoadCurrentChat } from './../../../state/actions/chats.actions';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
@Input() public chatList: Observable<any>;
@Input() public requestsList: Observable<any>;
@Input() public typeChat: string;
public photo: string;
public hiddenChatList: string = 'hiddenChatListWidth no-padd';
public openedChatList: string = 'col-xs-4 no-padd';
public isOpenedChatList: boolean = true;
public activeChat: number;
@Input() public chatId: number;
@Output() public chatWidth: string = 'col-xs-4 no-padd';
@Output() public setChatWidth  = new EventEmitter<string>();
@Output() public newChatId: number;
@Output() public goToChat  = new EventEmitter<number>();

  constructor(
    private router: Router,
    private routerService: RouterService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple.jpg';
    this.chatWidth = this.openedChatList;
    this.setChatWidth.emit(this.chatWidth);
    this.getChatId();

  }
  public openChatWindow(newChatId: number) {
    this.newChatId = newChatId;
    this.goToChat.emit(this.chatId);
    this.activeChat = newChatId;
    this.store.dispatch(new LoadCurrentChat(newChatId));
    this.router.navigate(['/main/chats/chat-window/', newChatId]);
  }
  public hideChatList(): void {
    this.isOpenedChatList = !this.isOpenedChatList;
    this.isOpenedChatList === true ? this.chatWidth = this.openedChatList : this.chatWidth = this.hiddenChatList;
    this.setChatWidth.emit(this.chatWidth);
  }

  private getChatId() {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/chats/chat-window/');
      const currentCHatId = urlSegments[1];
      this.activeChat =  +currentCHatId;
    });
  }
}
