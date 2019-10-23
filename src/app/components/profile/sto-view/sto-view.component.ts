import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../types/types';
import * as _ from 'lodash';

@Component({
  selector: 'app-sto-view',
  templateUrl: './sto-view.component.html',
  styleUrls: ['./sto-view.component.scss']
})
export class StoViewComponent implements OnInit {
  public user: Observable<types.NewUser>;
  public activeUrl: string = 'skills-to-obtain';
  public myGoals = [] as any;

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
      this.myGoals = data.user$.data.keyData.goals;
    });
  }

  addSkill() {
    this.router.navigate(['/profile/skills-to-obtain']);
  }
}
