import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { types } from 'src/app/types/types';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss']
})
export class RequestItemComponent implements OnInit {
  public photo: string;
  @Input() public chat: types.RequestListForChats;
  @Input() public isOpenedChatList: boolean;
  @Input() public activeChat?: number;

  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple2.jpg';
  }

}
