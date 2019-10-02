import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { LoadTags } from '../../../state/actions/filters.actions';
import { LoadUserData } from '../../../state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { selectHours } from '../../../shared/constants/select-hours';
import { skillLevel } from '../../../shared/constants/skill-levels';

@Component({
  selector: 'app-skills-to-otain',
  templateUrl: './skills-to-otain.component.html',
  styleUrls: ['./skills-to-otain.component.scss']
})
export class SkillsToOtainComponent implements OnInit {
  @ViewChild('skillsDataForm', { read: true, static: false  }) public skillsDataForm: NgForm;
  @Input() user: types.NewUser;
  @Output() selected = [] as  any;
  @Output() skillPlaceholder: string;
  @Output() newValue: string;
  @Output() time: any = selectHours;
  @Output() levelSkill: any = skillLevel;
  private selectedTagsId = [] as  any;
  private newTags = [] as  any;
  @Input() activePage: string;
  @Input() valueSearch: any;
  public tagsSkills = [] as  any;
  @Input() myGoals = [] as any;
  public createdSkillToObtaine: types.AddGoalAPI;
  public tagsInterests = [] as  any;
  private openAuto: boolean = false;
  private showBtn: boolean = false;
  private showChoosedSkill: boolean = false;
  public newSkill: boolean = false;
  private choosedSkill: any;
  private choosedSkillname: any;
  public options: any;

  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private data: HttpService,
    private router: Router,
    private store: Store<any>,
  ) { }

  ngOnInit() {

    this.initSearchForm();
    this.init();
  }

  init() {
    this.store.dispatch(new LoadTags());
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if (state !== undefined || state) {
        this.tagsSkills = state.tagsSkills;
        const result = _.differenceBy(this.tagsSkills, this.myGoals, 'name');
        this.tagsInterests = state.tagsInterests;
      }
    });
  }

  public setValueFromDropDown(option) {
    this.showChoosedSkill = true;
    this.choosedSkill = option.value;
    this.choosedSkillname = option.name;
    this.openAuto = false;
  }
// Create new tag of skill
  public setValue(val) {
    if (val !== null) {
      setTimeout(() => {
        this.showChoosedSkill = true;
        this.choosedSkill = val;
        this.newSkill = true;
        this.openAuto = false;
        this.showBtn = true;
      });
    }
  }

  private initSearchForm(): void {
    this.skillPlaceholder = 'Start to type name of goal';
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearch(query);
        } else {

        }
      });
  }

  public setSearch(query: string): void {
    this.options = this.tagsSkills;
    const search = _.filter(this.tagsSkills, o => _.includes(o.srchStr, query));
    this.openAuto = true;
    if (this.selected.length !== 0) {
      const result = _.differenceBy(search, this.selected, 'value');
      this.options = result;
    } else {
      this.options = search;
    }
    if (this.options.length === 0) {
      this.openAuto = false;
      this.showBtn = true;
    }
  }

  public changeSkill () {
    this.showChoosedSkill = false;
    this.choosedSkill = "";
    this.showBtn = false;
    this.newSkill = false;
  }

  public saveBtn (currLvlValue: string, expLvlValuE: string, goalValue?: number, decr?: string) {
    if (typeof this.choosedSkill === 'string') {
      this.createdSkillToObtaine = {
        currentLevel: currLvlValue,
        expectedLevel: expLvlValuE,
        name: this.choosedSkill,
        decription: decr
      };
    } else {
      this.createdSkillToObtaine = {
        currentLevel: currLvlValue,
        expectedLevel: expLvlValuE,
        tagId: this.choosedSkill
      };
    }
    this.data.postNewGoal(this.createdSkillToObtaine).subscribe((data) => {
      if (data.status === 200) {
      this.router.navigate(['profile/about-me']);
      }
    });
  }
}
