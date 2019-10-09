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
  selector: 'app-skills-to-obtain',
  templateUrl: './skills-to-obtain.component.html',
  styleUrls: ['./skills-to-obtain.component.scss']
})
export class SkillsToObtainComponent implements OnInit {
  @ViewChild('skillsDataForm', { read: true, static: false  }) public skillsDataForm: NgForm;
  public user: Observable<types.NewUser>;
  @Output() selected = [] as  any;
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
    this.store.dispatch(new LoadUserData());
    this.store.dispatch(new LoadTags());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.userUploaded = true;
        this.myGoals = state.keyData.goals;
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
    console.log(val);
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
    const result1 = _.differenceBy(this.tagsSkills, this.myGoals, 'name');
    this.options = result1;
    const search = _.filter(this.tagsSkills, o => _.includes(o.srchStr, querySearch));
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

  // FUntion og chanching selects
  agreeMoney(e) {
    this.moneyOffered = e.target.checked;
  }
  agreeService(e) {
    this.servicesOffered = e.target.checked;
  }
  agreeSkills(e) {
    this.skillsOffered = e.target.checked;
  }

  public saveBtn(
    currLevel: number,
    expLevel: number,
    trial: boolean,
    hide: boolean,
    nameOfNewSkill?: string,
    descr?: string) {

      this.createdSkillToObtaine = {
      currentLevel: currLevel,
      expectedLevel: expLevel,
      moneyOffered: this.moneyOffered,
      servicesOffered: this.servicesOffered,
      skillsOffered: this.skillsOffered,
      withTrial: trial,
      hidden: hide,
      name: nameOfNewSkill,
      description: descr
      };
console.log(this.createdSkillToObtaine);
    // if (typeof this.choosedSkill === 'string') {
    //   // this.createdSkillToObtaine = {
    //   //   currentLevel: currentLevel,
    //   //   expectedLevel: expectedLevel,
    //   //   name: this.choosedSkillname,
    //   //   description: description,
    //   //   withTrial: withTrial,
    //   //   moneyOffered: moneyOffered,
    //   //   services: [],
    //   //   servicesOffered: servicesOffered,
    //   //   skills: [],
    //   //   skillsOffered: false,
    //   //   hidden: hidden
    //   // };
    // } else {
    //   // this.createdSkillToObtaine = {
    //   //   currentLevel: currLvlValue,
    //   //   expectedLevel: expLvlValuE,
    //   //   id: this.choosedSkill,
    //   //   withTrial: trialLesson,
    //   //   moneyOffered: true,
    //   //   services: [null],
    //   //   servicesOffered: false,
    //   //   skills: [null],
    //   //   skillsOffered: false,
    //   //   hidden: false
    //   // };
    // }
    // this.data.postNewGoal(this.createdSkillToObtaine).subscribe((data) => {
    //   console.log(data);
    //   if (data.status === 200) {
    //   // this.router.navigate(['profile/about-me']);
    //   }
    // });
  }
}
