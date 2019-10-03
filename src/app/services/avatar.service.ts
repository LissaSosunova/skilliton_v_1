import { Injectable } from '@angular/core';
import { types } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  public parseAvatar(avatarDb: types.Avatar): types.Avatar {
    const avatar: types.Avatar = {} as types.Avatar;
    avatar.owner = avatarDb.owner;
    if (avatarDb.avatar) {
      avatar.url = `data:${avatarDb.avatar.contentType};base64,${avatarDb.avatar.image}`;
    } else {
      avatar.url = avatarDb.url ||  'assets/images/einstain.png';
    }
    return avatar;
  }
}
