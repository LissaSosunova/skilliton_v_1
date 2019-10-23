import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { LoadTags } from '../../../state/actions/filters.actions';
import { LoadUserData, UpdateUsersGoals } from 'src/app/state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { selectHours } from '../../../shared/constants/select-hours';
import { skillLevel } from '../../../shared/constants/skill-levels';

@Component({
  selector: 'app-skills-to-obtain',
  templateUrl: './skills-to-obtain.component.html',
  styleUrls: ['./skills-to-obtain.component.scss']
})
export class SkillsToObtainComponent implements OnInit {
  @ViewChild('skillsDataForm', { read: true, static: false  }) public skillsDataForm: NgForm;
  @Output() user: Observable<types.NewUser>;
  @Output() skillPlaceholder: string;
  @Output() newValue: string;
  @Output() time: any = selectHours;
  @Output() levelSkill: any = skillLevel;
  private selectedTagsId = [] as  any;
  private newTags = [] as  any;
  public activeUrl: string = 'skills-to-obtain';
  @Input() valueSearch: any;
  public tags: any;
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
  public userUploaded: boolean;
  private moneyOffered: boolean = true;
  private servicesOffered: boolean = false;
  private skillsOffered: boolean = false;
  private hidden: boolean = false;
  private withTrial: boolean = false;
  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  private noSkillsForSelect: boolean = false;
  private noServicesForSelect: boolean = false;

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
    this.store.dispatch(new LoadUserData());
    this.store.dispatch(new LoadTags());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.userUploaded = true;
        this.myGoals = state.keyData.goals;
        if(this.user && state.keyData.skills.length === 0 ){
          this.noSkillsForSelect = true;
        }
        if(this.user && state.keyData.myServices.length === 0 ){
          this.noServicesForSelect = true;
        }
      }
    });
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if  (state !== undefined || state && state.skills.length > 1)  {
        this.tags = state;
      }
    });
  }

  public setValueFromDropDown(option) {
    this.showChoosedSkill = true;
    this.choosedSkill = option.id;
    this.choosedSkillname = option.name;
    this.openAuto = false;
  }
// Create new tag of skill
  public setValue(val) {
    if (val !== null) {
      setTimeout(() => {
        this.showChoosedSkill = true;
        this.choosedSkillname = val;
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
        } else if (!query || query === '') {
          this.openAuto = false;
          this.showBtn = false;
        }
      });
  }

  public setSearch(query: string): void {
    const querySearch = _.lowerCase(query);
    this.tagsSkills = this.tags.skills;
    const result1 = _.differenceBy(this.tagsSkills, this.myGoals, 'id');
    this.options = result1;
    const search = _.filter(this.tagsSkills, o => _.includes(o.srchStr, querySearch));
    this.openAuto = true;
    if (this.user) {
      const result = _.differenceBy(search, this.myGoals, 'id');
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
    this.choosedSkill = null;
    this.showBtn = false;
    this.newSkill = false;
  }

  // FUntion og chanching selects
  agreeMoneyHandler(e) {
    this.moneyOffered = e.target.checked;
  }
  agreeServiceHandler(e) {
    this.servicesOffered = e.target.checked;
  }
  agreeSkillsHandler(e) {
    this.skillsOffered = e.target.checked;
  }
  hiddenHandler(e) {
    this.hidden = e.target.checked;
  }
  trialHandler(e) {
    this.withTrial = e.target.checked;
  }

  public saveBtn(
    currLevel: number,
    expLevel: number,
    trial: boolean,
    hide: boolean,
    nameOfNewSkill?: string,
    descr?: string) {
      if (typeof this.choosedSkill !== 'number') {
        this.createdSkillToObtaine = {
          currentLevel: currLevel,
          expectedLevel: expLevel,
          moneyOffered: this.moneyOffered,
          servicesOffered: this.servicesOffered,
          skillsOffered: this.skillsOffered,
          withTrial: this.withTrial,
          hidden: this.hidden,
          name: nameOfNewSkill,
          description: descr
          };
      } else if (this.choosedSkill) {
        this.createdSkillToObtaine = {
          currentLevel: currLevel,
          expectedLevel: expLevel,
          moneyOffered: this.moneyOffered,
          servicesOffered: this.servicesOffered,
          skillsOffered: this.skillsOffered,
          withTrial: this.withTrial,
          hidden: this.hidden,
          id: this.choosedSkill
          };
      }
      this.data.postNewGoal(this.createdSkillToObtaine).subscribe((data) => {
        if (data.error === false || data.status === 200) {
          this.data.getUser().subscribe((res) => {
            this.store.dispatch(new UpdateUsersGoals(res.data.keyData.goals));
            this.router.navigate(['/profile']);
          });
        }
      });
  }
}
