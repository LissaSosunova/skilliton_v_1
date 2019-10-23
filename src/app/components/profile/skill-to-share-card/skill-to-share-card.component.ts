import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';
import { skillLevel } from '../../../shared/constants/skill-levels';
import { LoadTags } from '../../../state/actions/filters.actions';
import { LoadLangsData } from '../../../state/actions/langs.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-skill-to-share-card',
  templateUrl: './skill-to-share-card.component.html',
  styleUrls: ['./skill-to-share-card.component.scss']
})
export class SkillToShareCardComponent implements OnInit {
  public enableSkill: boolean = true;
  public skills: Observable<any>;
  private showSkills: boolean = false;

  constructor(
    private store: Store<any>
    ) { }

  ngOnInit() {
    const skills$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.skills = state.keyData.skills;
        if (state.keyData.skills.length !== 0) {
          this.showSkills = true;
        }
      }
    });
  }
}
