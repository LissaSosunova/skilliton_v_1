import { Component, OnInit, Input } from '@angular/core';
import { ChatEmotions } from './../../../shared/constants/chat-emotions';
import { postExapleAPI } from '../../../shared/constants/post-exaple';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
@Input() post: any;
public photo: string;
public emotions = ChatEmotions;
  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple.jpg';
  }

  public chooseEmo(id): void {
    console.log('choose emo');
  }

  public openMorePost(id): void {
    console.log('open details');
  }

}
