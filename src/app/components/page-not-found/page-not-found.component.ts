import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  private photo: string;
  constructor() { }

  ngOnInit() {
    this.photo = 'assets/images/not_found.png';
  }
}