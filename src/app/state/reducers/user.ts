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
  nickname: "",
  rate: 0,
  sex: null,
  socialAccount: "",
  socialAccountId: null,
  summary: null
};

export function userReducer(state: any, action: any)  {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
