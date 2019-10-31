import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-skill-to-share-card',
  templateUrl: './skill-to-share-card.component.html',
  styleUrls: ['./skill-to-share-card.component.scss']
})
export class SkillToShareCardComponent implements OnInit {
  public enableSkill: boolean = true;
  public skills = [] as any;
  private showSkills: boolean = false;
  private initSkills = [] as any;
  constructor(
    private store: Store<any>
    ) { }

  ngOnInit() {
    const skills$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {

        this.initSkills = _.filter(state.keyData.skills, { 'level': null });
        this.skills = _.differenceBy(state.keyData.skills, this.initSkills, 'id');
        if (state.keyData.skills.length !== 0) {
          this.showSkills = true;
        }
      }
    });
  }
}
