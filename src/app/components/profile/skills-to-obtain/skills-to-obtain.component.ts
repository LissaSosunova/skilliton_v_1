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
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-skills-to-obtain',
  templateUrl: './skills-to-obtain.component.html',
  styleUrls: ['./skills-to-obtain.component.scss']
})
export class SkillsToObtainComponent implements OnInit {
  @ViewChild('skillsDataForm', { read: true, static: false  }) public skillsDataForm: NgForm;
  @ViewChild('infoPopup', { static: false }) public infoPopup: AlertModalComponent;
  @Output() user: Observable<types.NewUser>;
  @Output() skillPlaceholder: string;
  @Output() newValue: string;
  @Output() time: any = selectHours;
  @Output() levelSkill: any = skillLevel;
  @Output() skillsPlaceholder: string;
  private selectedTagsId = [] as  any;
  private newTags = [] as  any;
  public activeUrl: string = 'skills-to-obtain';
  @Input() valueSearch: any;
  public tags: any;
  public tagsSkills = [] as  any;
  @Input() myGoals = [] as any;
  public mySkills = [] as any;
  public myServices = [] as any;
  public createdSkillToObtaine: types.AddGoalAPI;
  public optionsUserSkills = [] as  any;
  public optionsUserServises = [] as  any;
  private openAuto: boolean = false;
  private openAutoUsersSkills: boolean = false;
  private openAutoUsersServices: boolean = false;
  public skillsExpList = [] as  any;
  public skillsArrAPI = [] as  any;
  public servicesExpList = [] as  any;
  public servicesArrAPI = [] as  any;
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
  private skillsOffereArr = [] as any;
  private hidden: boolean = false;
  private withTrial: boolean = false;
  public searchControl: FormControl;
  public searchSkillsControl: FormControl;
  public searchServicesControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  private noSkillsForSelect: boolean = false;
  private noServicesForSelect: boolean = false;
  private showErrorText: string;
  private actionName: string;
  private headerError: string;

  constructor(
    private data: HttpService,
    private router: Router,
    private store: Store<any>,
    public alertModal: AlertModalComponent,
  ) { }

  ngOnInit() {
    this.initSearchForm();
    this.initSearchUserSkillsForm();
    this.initSearchUserServiceForm();
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
        this.mySkills = _.filter(state.keyData.skills, { 'isShared': true });
        if(this.user && this.mySkills.length === 0 ){
          this.noSkillsForSelect = true;
        } else {
          this.mySkills.forEach(el => {
            el.srchStr = _.lowerCase(el.name);
            });
        }
        if(this.user && state.keyData.services.length === 0 ){
          this.noServicesForSelect = true;
        } else {
          this.myServices = state.keyData.services;
          this.myServices.forEach(el => {
            el.srchStr = _.lowerCase(el.name);
            });
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

  // Search for global skill to obtain
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

// Search for users skills

private initSearchUserSkillsForm(): void {
  this.skillsPlaceholder = 'Start to type...';
  this.searchSkillsControl = new FormControl();
  this.searchSkillsControl.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
    .subscribe(query => {
      if (query) {
        this.setSearchUsersSkills(query);
      } else if (!query || query === '') {
        this.openAutoUsersSkills = false;
      }
    });
}
public setSearchUsersSkills(query: string): void {
  const querySearch = _.lowerCase(query);
  const skillsArr = this.mySkills;
  const search = _.filter(skillsArr, o => _.includes(o.srchStr, querySearch));
  const result1 = _.differenceBy(search, this.skillsExpList, 'id');
  this.openAutoUsersSkills = true;
  this.optionsUserSkills = result1;
  if (this.optionsUserSkills.length === 0) {
    this.openAutoUsersSkills = false;
  }
}

public changeUsersSkillList(option): void {
  const newList = _.filter(this.skillsExpList, function (f) { return f.id !== option.id; });
  const goalsAPI = _.remove(this.skillsArrAPI, (n) => {
    return n === option.id;
  });
  this.skillsExpList = newList;

}

public setValueUsersSkillsFromDropDown(option) {
  this.skillsExpList.push({name: option.name, id: option.id});
  this.skillsArrAPI.push(option.id);
  this.openAutoUsersSkills = false;
}

// Search for users services

private initSearchUserServiceForm(): void {
  this.skillsPlaceholder = 'Start to type...';
  this.searchServicesControl = new FormControl();
  this.searchServicesControl.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
    .subscribe(query => {
      if (query) {
        this.setSearchUsersServices(query);
      } else if (!query || query === '') {
        this.openAutoUsersServices = false;
      }
    });
}
public setSearchUsersServices(query: string): void {
  const querySearch = _.lowerCase(query);
  const servicesArr = this.myServices;
  const search = _.filter(servicesArr, o => _.includes(o.srchStr, querySearch));
  const result1 = _.differenceBy(search, this.servicesExpList, 'id');
  this.openAutoUsersServices = true;
  this.optionsUserServises = result1;
  if (this.optionsUserServises.length === 0) {
    this.openAutoUsersServices = false;
  }
}

public changeUsersServiceList(option): void {
  const newList = _.filter(this.servicesExpList, function (f) { return f.id !== option.id; });
  const goalsAPI = _.remove(this.servicesArrAPI, (n) => {
    return n === option.id;
  });
  this.servicesExpList = newList;

}

public setValueUsersServiceFromDropDown(option) {
  this.servicesExpList.push({name: option.name, id: option.id});
  this.servicesArrAPI.push(option.id);
  this.openAutoUsersServices = false;
}

  // Function of chanching selects
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

  // Send API
  public saveBtn(
    currLevel: number,
    expLevel: number,
    trial: boolean,
    hide: boolean,
    nameOfNewSkill?: string,
    descr?: string,
    expectedRes?: string) {
      if (typeof this.choosedSkill !== 'number') {
        this.createdSkillToObtaine = {
          currentLevel: currLevel,
          expectedLevel: expLevel,
          moneyOffered: this.moneyOffered,
          servicesOffered: this.servicesOffered,
          skillsOffered: this.skillsOffered,
          skills: this.skillsArrAPI,
          withTrial: this.withTrial,
          hidden: this.hidden,
          name: nameOfNewSkill,
          description: descr,
          expectedResult: expectedRes
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
          id: this.choosedSkill,
          expectedResult: expectedRes
          };
      }

      if (this.skillsOffered === true && this.skillsArrAPI.length !== 0 ) {
        this.createdSkillToObtaine.skills = this.skillsArrAPI;
      } else if (this.skillsOffered === true && this.skillsArrAPI.length === 0) {
        this.showErrorText = "The 'What are you ready to give in exchange' field in incompleted. Please, choose some of your skills to share or unselect 'Skills' if you don't want to offer any of them to obtain this Skill.";
        this.actionName = 'ERROR';
        this.headerError = "It seems you've forgotten something...";
        this.infoPopup.open();
      }
      if (this.servicesOffered === true  && this.servicesArrAPI.length !== 0) {
        this.createdSkillToObtaine.services = this.servicesArrAPI;
      } else if (this.servicesOffered === true  && this.servicesArrAPI.length === 0) {
        this.showErrorText =  "The 'What are you ready to give in exchange' field in incompleted. Please, choose some of your services or unselect 'Services' if you don't want to offer any of them to obtain this Skill.";
        this.actionName = 'ERROR';
        this.headerError = "It seems you've forgotten something...";
        this.infoPopup.open();
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
