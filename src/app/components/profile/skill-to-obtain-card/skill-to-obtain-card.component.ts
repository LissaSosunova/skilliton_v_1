import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-skill-to-obtain-card',
  templateUrl: './skill-to-obtain-card.component.html',
  styleUrls: ['./skill-to-obtain-card.component.scss']
})
export class SkillToObtainCardComponent implements OnInit {
  public enableSkill: boolean = true;
  public skills = [] as any;
  public showSkills: boolean = false;
  public initSkills = [] as any;
  constructor(
    private store: Store<any>
    ) { }

  ngOnInit() {
    const goals$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.initSkills = _.filter(state.keyData.goals, { 'currentLevel': null });
        this.skills = _.differenceBy(state.keyData.goals, this.initSkills, 'goalId');
        if (state.keyData.goals.length !== 0) {
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
