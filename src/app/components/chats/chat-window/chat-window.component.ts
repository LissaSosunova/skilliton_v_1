import { ChatEmotions } from './../../../shared/constants/chat-emotions';
import { types } from './../../../types/types';
import { LoadCurrentChat, LoadChats } from './../../../state/actions/chats.actions';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, Input, ElementRef, OnChanges, EventEmitter } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { RouterService } from '../../../services/router.service';
import { ChatsService } from '../../../services/chats.service';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { ToastsService } from '../../../services/toasts.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnChanges {
@Input() public chatId?: number;
@Output() public messages: Observable<types.Chat>;
public chat: types.Chat;
public chatUploader = new BehaviorSubject<boolean>(false);
private draftObj: any;
@Output() inputMes: string;
@Output() editableInputMes: string;
@Output() cancelEditing = new EventEmitter<boolean>();
private savedDraft: string;
private savedEditedMesDraft: string;
@ViewChild('messageBox') private messageBox: ElementRef;
private messageBoxElement: HTMLDivElement;
public control: FormControl;
public openEmoList: boolean = false;
public emotions = ChatEmotions;
public isActiveChat = new BehaviorSubject<boolean>(false);
public updateChat: boolean = false;
public editableMessageId: any;

  constructor(
    private data: HttpService,
    public router: Router,
    private routerService: RouterService,
    private store: Store<any>,
    private chatService: ChatsService,
    public toastService: ToastsService
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
      this.inputMes = '';
      if (state.currChat) {
        this.chat = state.currChat;
        const reverced$ = state.currChat.data.reverse();
        this.messages = reverced$;
        // Set value for active chat boolean
        state.currChat.addInfo.matchStatus === 1 ? this.isActiveChat.next(true) : this.isActiveChat.next(false);
        reverced$.forEach((t) => {
          if (t.content.status === 0 && t.content.isMine === true) {
            this.inputMes = t.content.text;
          }
        });
        this.chatUploader.next(true);
        this.scrollMessageBox();
      }
      });
  }

  public sendMessage(): any {
    if ( this.inputMes !== '' && typeof this.inputMes !== undefined) {
      this.inputMes = this.inputMes.replace(/\n/g, '<br/>');
      this.inputMes = this.inputMes.replace('<br/><br/>', '');
      if (typeof this.chatId == 'number') {
        const options = {
          id: this.chatId,
          draft: false,
          text: this.inputMes
        };
        this.sendDataToChat(options);
      } else {
        this.getChatId();
        const options = {
          id: this.chatId,
          draft: false,
          text: this.inputMes
        };
        this.sendDataToChat(options);
      }
    }
  }
  public sendEditedMessage(): any {
    if (this.editableInputMes !== '' && typeof this.editableInputMes !== undefined) {
      this.editableInputMes = this.editableInputMes.replace(/\n/g, '<br/>');
      this.editableInputMes = this.editableInputMes.replace('<br/><br/>', '');
      const options = {
        draft: false,
        text: this.editableInputMes,
        id: this.editableMessageId
      };

      this.data.editMessage(options).subscribe((resp) => {
        if (resp.error === false) {
          this.updateChat = !this.updateChat;
          this.store.dispatch(new LoadCurrentChat(this.chatId));
          this.toastService.openToastSuccess("Editing message complete.");
          this.scrollMessageBox();
        }
      });
    }
  }
  public writeMessage(e): void {
    this.inputMes = e.target.value;
    this.sendMessage();
  }
  public writeEditableMessage(e): void {
    this.editableInputMes = e.target.value;
    this.sendEditedMessage();
  }
  public saveDraft(e): void {
    if (e.target.value !== '') {
      this.inputMes = e.target.value;
      this.savedDraft = this.inputMes.replace(/\n/g, '<br/>');
      this.savedDraft = this.inputMes.replace('<br/><br/>', '');
      const options = {
        id: this.chatId,
        draft: true,
        text: this.savedDraft
      };
      this.sendDataToChat(options);
    }
  }
  private sendDataToChat(options): void {
    this.data.postMessage(options).subscribe((resp) => {
      if (options.draft === false) {
        this.inputMes = '';
      }
      this.store.dispatch(new LoadCurrentChat(this.chatId));
      this.scrollMessageBox();
    });
  }
  deleteMessage($event): void {
    if ($event === true) {
      this.store.dispatch(new LoadCurrentChat(this.chatId));
      this.scrollMessageBox();
    }
  }
  editMessage($event): void {
    if ($event.edit === true) {
      this.updateChat = !this.updateChat;
      this.editableInputMes = $event.text.replace(/<br\s*[\/]?>/gi, '\n');
      this.editableMessageId = $event.id;
    } else if ($event.edit === false) {
      this.updateChat = false;
    }
  }

  cancelEditMess() {
    this.updateChat = !this.updateChat;
    this.inputMes = '';
    this.editableInputMes = '';
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(): void {
  }

  public scrollMessageBox(): void {
    setTimeout(() => {
      const scroll = this.messageBox.nativeElement.scrollHeight;
      this.messageBox.nativeElement.scrollTo(0, scroll);
    }, 600);
  }
// Match and Dismatch
  public matching(id: number) {
    this.chatService._getChatList();
    this.data.getConfirmMaych(id, true).subscribe((data) => {
      if(data.error === false) {
        this.chatService._getChatList();
      }
    });
  }

  public dismatch(id: number) {
    this.data.getConfirmMaych(id, false).subscribe((data) => {
      if(data.error === false) {
        this.chatService._getChatList();
      }
    });
  }
// Emotions
  public openEmo(): void {
    this.openEmoList = !this.openEmoList;
  }

  public outsideEmoClick(): void {
    this.openEmoList = false;
  }

  public chooseEmo(emo: string): void {
    if (this.inputMes) {
      this.inputMes = this.inputMes + emo;
    } else {
      this.inputMes = emo;
    }
  }
}
