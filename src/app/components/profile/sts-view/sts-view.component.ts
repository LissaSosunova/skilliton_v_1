import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../types/types';
import * as _ from 'lodash';

@Component({
  selector: 'app-sts-view',
  templateUrl: './sts-view.component.html',
  styleUrls: ['./sts-view.component.scss']
})
export class StsViewComponent implements OnInit {
  public user: Observable<types.NewUser>;
  public activeUrl: string = 'skill-to-share';
  public mySkills = [] as any;

  constructor(
    private router: Router,
    private store: Store<types.NewUser>,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.init();
  }
  private init(): void {
    this.getUserData();
  }

  private getUserData(): void {
    this.actRoute.data.subscribe(data => {
      this.user = data.user$.data;
      this.mySkills = data.user$.data.keyData.skills;
    });
  }

  addSkill() {
    this.router.navigate(['/main/profile/skill-to-share']);
  }

}
