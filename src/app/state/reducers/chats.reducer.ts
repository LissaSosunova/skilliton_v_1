import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { ChatsActionTypes } from '../actions/chats.actions';
import { types } from 'src/app/types/types';
import { act } from '@ngrx/effects';
import { isArray } from 'util';


export const chatsFeatureKey = 'chats';

export interface State {
  requests: Array<types.RequestListForChats>;
  chatList: Array<types.ChatsListForChats>;
  currChat: types.Chat;
}

export const initialState: State = {
  requests: [],
  chatList: [],
  currChat: {
    data: [],
    addInfo: {
      id: null,
      chatDetails: {
        partnerName: "Default name",
        partnerLastName: "Default last name",
        chatGoalName: "Default skill",
        chatSkillName: null
      },
      lastEvent: null,
      isActive: false,
      unreadAmount: null
    }
  }
};

export function chatsReducer(state = initialState, action: any): State {
  const updateState = {...state};
  switch (action.type) {
    case ChatsActionTypes.LOAD_CHATS_SUCCESS : {
      if (action.payload) {
        state = action.payload.data;
        return state;
      }
    }
    case ChatsActionTypes.LOAD_CURRENT_CHAT_SUCCESS : {
      if (action.payload) {
        const data = action.payload;
        const check$ = action.payload.data;
        for (let i = 0; i < check$.length; i++) {
          if (check$[0].eventType !== 0) {
            let last = new Date(check$[0].time);
            let second = new Date(check$[1].time);
            if (last > second) {
              data.data = check$.reverse();
            }
          }
          }
        updateState.currChat = data;
        return updateState;
      }
    }
    case ChatsActionTypes.LOAD_CURRENT_CHAT_ERROR : {
      if (action.payload) {
        return updateState;
      }
    }
    default:
      return state;
  }
}
