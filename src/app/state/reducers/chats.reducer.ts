import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { ChatsActionTypes } from '../actions/chats.actions';


export const chatsFeatureKey = 'chats';

export interface State {
  requests: any;
  chatList: any;
  currChat: any;
}

export const initialState: State = {
  requests: [],
  chatList: [],
  currChat: ''
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
        updateState.currChat = action.payload;
        return updateState;
      }
    }
    case ChatsActionTypes.LOAD_CURRENT_CHAT_ERROR : {
      if (action.payload) {
        updateState.currChat = {
          addInfo : {
            chatDetails: {
              partnerName: "Default name",
              partnerLastName: "Default last name",
              chatGoalName: "Default skill",
              chatSkillName: null
            }
          }
        };
        return updateState;
      }
    }
    default:
      return state;
  }
}
