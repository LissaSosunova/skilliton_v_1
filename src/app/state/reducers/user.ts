import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';

import { types } from '../../types/types';
import * as userAction from '../actions/user.actions';

export const stateFeatureKey = 'state';


export interface State {
    active: boolean;
    birthAddress: any;
    birthDate: string;
    currentAddress: any;
    email: string;
    id: number;
    lastName: string;
    name: string;
    nickname: string;
    rate: number;
    sex: null
    socialAccount: any;
    socialAccountId: any;
    summary: any;
}
const userInitState: types.User = {
  active: true,
  birthAddress: "",
  birthDate: "",
  currentAddress: "",
  email: "",
  id: 0,
  lastName: "",
  name: "",
  rate: 0,
  sex: null,
  socialAccount: "",
  socialAccountId: null,
  summary: null
};

export function userReducer(state: any, action: any)  {
  const updateState: types.User = {...state};
  switch (action.type) {
    
    case userAction.UserActionTypes.LOAD_USER_SUCCESS: {
      const user: types.User = action.payload;
      state = user;
      return user;
    }
    default:
      return state;
    }

  };


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];



// export function userReducer(state = userInitState, action: any) {
//   const actions = {
//     [userAction.UserActionTypes.LOAD_USER]: (): State => ({
//       ...state,
//     }),
//     [userAction.UserActionTypes.LOAD_USER_SUCCESS]: (): State => {
//       return ({
//         ...state,
//         userInitState: action.payload
//       });
//     }
//     }
  

//   return actions[action.type] ? actions[action.type]() : state;
// }
