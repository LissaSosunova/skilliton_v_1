import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'mate-skill-to-obtain-card',
  templateUrl: './skill-to-obtain-card.component.html',
  styleUrls: ['./skill-to-obtain-card.component.scss']
})
export class MateSkillToObtainCardComponent implements OnInit {

  public skills = [] as any;
  private showSkills: boolean = false;
  constructor(
    private store: Store<any>
    ) { }

  ngOnInit() {
    const skills$ = this.store.select('mateProfile').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.skills = state.keyData.goals;
        if (this.skills.length !== 0 ) {
          this.showSkills = true;
        }
      }
    });
  }
  public openSkill(id) {
    const name = 'goal' + id;
    const elems = Array.from(document.getElementsByTagName('div'));
    elems.forEach((el) => {
      if (el.id === name) {
        el.classList.toggle('non-vis');
      }
    });
  }
}
