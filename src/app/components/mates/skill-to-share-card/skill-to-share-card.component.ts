import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'mate-skill-to-share-card',
  templateUrl: './skill-to-share-card.component.html',
  styleUrls: ['./skill-to-share-card.component.scss']
})
export class MateSkillToShareCardComponent implements OnInit {

  public skills = [] as any;
  public showSkills: boolean = false;
  constructor(
    private store: Store<any>
    ) { }

  ngOnInit() {
    const skills$ = this.store.select('mateProfile').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.skills = state.keyData.skills;
        if (this.skills.length !== 0 ) {
          this.showSkills = true;
        }
      }
    });
  }

  public openSkill(id) {
    const name = 'skill' + id;
    const elems = Array.from(document.getElementsByTagName('div'));
    elems.forEach((el) => {
      if (el.id === name) {
        el.classList.toggle('non-vis');
      }
    });
  }
}