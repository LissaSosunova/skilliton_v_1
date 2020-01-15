import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss']
})
export class RequestItemComponent implements OnInit {
  public photo: string;
  @Input() public chat: Observable<any>;
  @Input() public isOpenedChatList: boolean;
  @Input() public activeChat?: number;

  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple2.jpg';
  }

}
