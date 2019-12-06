import { langs } from './../../../shared/constants/langs';
import { LeavePopupComponent } from './../../registration/leave-popup/leave-popup.component';
import { InputTextareaComponent } from './../../../shared/form-controls/input-textarea/input-textarea.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: any;
  public textShort: string;
  public textLong: string;
  private photo: string;
  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/post-exaple.jpg';
    this.getShortText(this.post.text);
  }

  private getShortText(text): void {
    let sliced = text.slice(0, 100);
    let slicedLong = text.slice(0, 300);
    if (sliced.length < text.length) {
    sliced += '...';
    }
    if (slicedLong.length < text.length){
      slicedLong += '...';
    }
    this.textShort = sliced;
    this.textLong = slicedLong;
  }

}
