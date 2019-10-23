import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';

@Component({
  selector: 'app-skill-to-obtain-card',
  templateUrl: './skill-to-obtain-card.component.html',
  styleUrls: ['./skill-to-obtain-card.component.scss']
})
export class SkillToObtainCardComponent implements OnInit {
  public enableSkill: boolean = true;
  public skills: Observable<any>;
  private showSkills: boolean = false;
  constructor(
    private store: Store<any>
    ) { }

  ngOnInit() {
    const goals$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.skills = state.keyData.goals;
        if (state.keyData.goals.length !== 0) {
          this.showSkills = true;
        }
      }
    });
  }

}
