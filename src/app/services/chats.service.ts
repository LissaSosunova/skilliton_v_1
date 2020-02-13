import { Injectable } from '@angular/core';
import { Store} from '@ngrx/store';
import { LoadChats } from '../state/actions/chats.actions';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private store: Store<any>,
  ) { }

  _getChatList(): void {
    this.store.dispatch(new LoadChats());
  }
}
