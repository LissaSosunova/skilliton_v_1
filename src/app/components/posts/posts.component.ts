import { Component, OnInit, Input, AfterViewInit, ViewChild, Output  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { postExapleAPI } from '../../shared/constants/post-exaple';
import { ChatEmotions } from '../../shared/constants/chat-emotions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() user: any;

  public emotions = ChatEmotions;
  public postsAPI = postExapleAPI.data.posts ;
  @Output() posts = [] as any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.posts = this.postsAPI;
  }

  chooseEmo(id) {
    const name = 'emo' + id;
    const elems = Array.from(document.getElementsByTagName('div'));
    elems.forEach((el) => {
      if (el.id === name) {
        el.classList.toggle('non-vis');
      }
    });
  }

  openMorePost(id) {
    const name = 'drop' + id;
    const elems = Array.from(document.getElementsByTagName('div'));
    elems.forEach((el) => {
      if (el.id === name) {
        el.classList.toggle('non-vis');
      }
    });
  }

  openMoreComment(id) {
    const name = 'comment' + id;
    const elems = Array.from(document.getElementsByTagName('div'));
    elems.forEach((el) => {
      if (el.id === name) {
        el.classList.toggle('non-vis');
      }
    });
  }

}
