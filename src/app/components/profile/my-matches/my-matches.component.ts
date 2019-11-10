import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit {
  @Output() activeTopBtn: 'myMatches';
  constructor() { }

  ngOnInit() {
  }

}