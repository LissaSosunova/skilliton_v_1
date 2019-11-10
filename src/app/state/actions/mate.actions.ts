import { Action } from '@ngrx/store';

export enum MateActionTypes {
  LoadMate = '[Mate] Load Mate',
}

export class LoadMates implements Action {
  readonly type = MateActionTypes.LoadMate;
  constructor(public payload) { }
}


export type MateActions = LoadMates;
