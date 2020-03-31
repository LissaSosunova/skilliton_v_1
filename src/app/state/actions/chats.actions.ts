import { Action } from '@ngrx/store';

export enum ChatsActionTypes {
  LOAD_CHATS = '[Chats] Load Chats',
  LOAD_CHATS_SUCCESS = '[Chats] Load Chats success',
  LOAD_CHATS_ERROR = '[Chats] Load Chats error',
  LOAD_CURRENT_CHAT = '[Chat] Load Current Chat',
  LOAD_CURRENT_CHAT_SUCCESS = '[Chat] Load Current Chat success',
  LOAD_CURRENT_CHAT_ERROR = '[Chat] Load Current Chat error',
  UPDATE_CHAT_LIST = '[Chats] Update Chat list'
}

export class LoadChats implements Action {
  readonly type = ChatsActionTypes.LOAD_CHATS;
}
export class UpdateChatList implements Action {
  readonly type = ChatsActionTypes.UPDATE_CHAT_LIST;
}
export class LoadChatsSuccess implements Action {
  readonly type = ChatsActionTypes.LOAD_CHATS_SUCCESS;
  constructor(public payload) { }
}

export class LoadChatsError implements Action {
  type = ChatsActionTypes.LOAD_CHATS_ERROR;
  constructor(public payload) { }
}

export class LoadCurrentChat implements Action {
  readonly type = ChatsActionTypes.LOAD_CURRENT_CHAT;
  constructor(public payload) { }
}

export class LoadCurrentChatSuccess implements Action {
  readonly type = ChatsActionTypes.LOAD_CURRENT_CHAT_SUCCESS;
  constructor(public payload) { }
}

export class LoadCurrentChatError implements Action {
  readonly type = ChatsActionTypes.LOAD_CURRENT_CHAT_ERROR;
  constructor(public payload) { }
}

export type ChatsActions = LoadChats;
