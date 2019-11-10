import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-skills-card',
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.scss']
})
export class SkillsCardComponent implements OnInit {
  @Input() skills: any;
  private avatar = 'assets/images/post-exaple2.jpg';

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  match() {
    console.log('match')
  }

}
