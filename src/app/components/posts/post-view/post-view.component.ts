import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
@Input() post: any;
private photo: string;
  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple.jpg';
  }

}
