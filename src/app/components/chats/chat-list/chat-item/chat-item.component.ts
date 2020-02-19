import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { types } from 'src/app/types/types';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
  public photo: string;
  @Input() public chat: types.ChatsListForChats;
  @Input() public isOpenedChatList: boolean;
  @Input() public activeChat?: number;
  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple.jpg';
  }

}