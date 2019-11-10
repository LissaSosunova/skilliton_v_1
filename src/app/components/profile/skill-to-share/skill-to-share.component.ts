import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { LoadTags } from '../../../state/actions/filters.actions';
import { LoadLangsData } from '../../../state/actions/langs.actions';
import { LoadUserData, UpdateUsersSkills } from 'src/app/state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { selectHours } from '../../../shared/constants/select-hours';
import { skillLevel } from '../../../shared/constants/skill-levels';
import { skillShareType } from '../../../shared/constants/skillShareType';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-skill-to-share',
  templateUrl: './skill-to-share.component.html',
  styleUrls: ['./skill-to-share.component.scss']
})
export class SkillToShareComponent implements OnInit {

  @ViewChild('skillsDataForm', { read: true, static: false  }) public skillsDataForm: NgForm;
  @ViewChild('infoPopup', { static: false }) public infoPopup: AlertModalComponent;
  @Output() user: Observable<types.NewUser>;
  @Output() skillPlaceholder: string;
  @Output() langsPlaceholder: string;
  @Output() goalsPlaceholder: string;
  @Output() newValue: string;
  @Output() time: any = selectHours;
  @Output() levelSkill: any = skillLevel;
  private showErrorText: string;
  private actionName: string;
  private headerError: string;
  private selectedTagsId = [] as  any;
  private newTags = [] as  any;
  public activeUrl: string = 'skills-to-share';
  @Input() valueSearch: any;
  public tags: any;
  public tagsSkills = [] as  any;
  public langs = [] as  any;
  @Input() myGoals = [] as any;
  public mySkills = [] as any;
  private arrDegree = [] as any;
  private degree: string | '';
  private choosedLang = [] as  any;
  private choosedLangname = [] as  any;
  private choosedSkill: any;
  private choosedGoals = [] as any;
  private choosedSkillname: any;
  private collegeSelected: boolean = false;
  private coursesSelected: boolean = false;
  private disConsultationVal: boolean = true;
  private disExpertOpVal: boolean = true;
  private disGroupVal:  boolean = true;
  private disIndividVal:  boolean = true;
  private hidden: boolean = false;
  private isShared: boolean = true;
  private langRequired: boolean = true;
  private moneyExpected: boolean = false;
  private noSkillsForSelect: boolean = false;
  private openAuto: boolean = false;
  private openAutoGoals: boolean = false;
  private openAutoLangs: boolean = false;
  private otherRequired: boolean = false;
  private otherRequiredErr: string;
  private otherSelected: boolean = false;
  private prices = [] as any;
  private selfEducationSelected: boolean = false;
  private servicesExpected: boolean = false;
  private showBtn: boolean = false;
  private showChoosedLangs:  boolean = false;
  private showChoosedSkill: boolean = false;
  private skillsExpected: boolean = false;
  private skillsExpList = [] as  any;
  private universitySelected: boolean = true;
  private unsubscribe$: Subject<void> = new Subject();
  private withTrial: boolean = false;
  public createdSkillToShare: types.AddSkillAPI;
  public currency = [{name: "USD", value: "USD"}, {name: "EURO", value: "EURO"}];
  public newSkill: boolean = false;
  public options: any;
  public optionsGoals: any;
  public optionsLangs: any;
  public pricingControl: FormControl;
  public searchControl: FormControl;
  public searchGoalsControl: FormControl;
  public searchLangsControl: FormControl;
  public tagsInterests = [] as  any;
  public userUploaded: boolean;

  constructor(
    private data: HttpService,
    private router: Router,
    private store: Store<any>,
    public alertModal: AlertModalComponent,
  ) { }

  ngOnInit() {
    this.initSearchForm();
    this.initSearchLangsForm();
    this.initSearchGoalsForm();
    this.init();
  }

  init() {
    this.store.dispatch(new LoadUserData());
    this.store.dispatch(new LoadTags());
    this.store.dispatch(new LoadLangsData());
    const user$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.user = state;
        this.userUploaded = true;
        this.myGoals = _.filter(state.keyData.goals, { 'hidden': false });
        this.mySkills = state.keyData.skills;
        this.mySkills.forEach(el => {
          el.id = el.tagId;
          });
        this.myGoals.forEach(el => {
          el.srchStr = _.lowerCase(el.name);
          el.id = el.tagId;
          });
        if(this.user && this.myGoals.length === 0 ) {
          this.noSkillsForSelect = true;
        }
      }
    });
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if  (state !== undefined || state && state.skills.length > 1)  {
        this.tags = state;
      }
    });
    const langs$ = this.store.select('langs').subscribe((state: any) => {
      if  (state !== undefined || state && state.langs.length > 1)  {
        this.langs = state;
      }
    });

    this.arrDegree = [
      {name: 'university', val: false, str: 'University'},
      {name: 'college', val: false, str: 'College'},
      {name: 'courses', val: false, str: 'Courses'},
      {name: 'selfEducation', val: false,  str: 'Self Education'},
      {name: 'other', val: false, str: ''}
    ];
  }

  public setValueFromDropDown(option) {
    this.showChoosedSkill = true;
    this.choosedSkill = option.id;
    this.choosedSkillname = option.name;
    this.openAuto = false;
  }

  public setValueLangsFromDropDown(option) {
    this.showChoosedLangs = true;
    this.choosedLang.push(option.id);
    this.choosedLangname.push({name: option.name, id: option.id});
    this.openAutoLangs = false;
    this.langRequired = false;
    this.searchLangsControl.reset({ value: '', disabled: false });
  }

  public setValueGoalsFromDropDown(option) {
    this.skillsExpList.push({name: option.name, id: option.id});
    this.choosedGoals.push(option.id);
    this.openAutoGoals = false;
    this.searchGoalsControl.reset({ value: '', disabled: false });
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

    // Search for skill

  private initSearchForm(): void {
    this.skillPlaceholder = 'Start to type name of skill';
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
    const result1 = _.differenceBy(this.tagsSkills, this.mySkills, 'id');
    this.options = result1;
    const search = _.filter(this.tagsSkills, o => _.includes(o.srchStr, querySearch));
    this.openAuto = true;
    if (this.user) {
      const result = _.differenceBy(search, this.mySkills, 'id');
      this.options = result;
    } else {
      this.options = search;
    }
    if (this.options.length === 0) {
      this.openAuto = false;
      this.showBtn = true;
    }
  }

  // Search for langs

  private initSearchLangsForm(): void {
    this.langsPlaceholder = 'Start to type...';
    this.searchLangsControl = new FormControl();
    this.searchLangsControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearchLangs(query);
        } else if (!query || query === '') {
          this.openAutoLangs = false;
        }
      });
  }
  public setSearchLangs(query: string): void {
    const querySearch = _.lowerCase(query);
    const langsArr = this.langs.langs;
    const search = _.filter(langsArr, o => _.includes(o.srchStr, querySearch));
    this.openAutoLangs = true;
    this.optionsLangs = search;
    if (this.optionsLangs.length === 0) {
      this.openAutoLangs = false;
    }
  }

  // Search for Goals

  private initSearchGoalsForm(): void {
    this.goalsPlaceholder = 'Start to type...';
    this.searchGoalsControl = new FormControl();
    this.searchGoalsControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearchGoals(query);
        } else if (!query || query === '') {
          this.openAutoGoals = false;
        }
      });
  }
  public setSearchGoals(query: string): void {
    const querySearch = _.lowerCase(query);
    const goalsArr = this.myGoals;
    const search = _.filter(goalsArr, o => _.includes(o.srchStr, querySearch));
    const result1 = _.differenceBy(search, this.skillsExpList, 'id');
    this.openAutoGoals = true;
    this.optionsGoals = result1;
    if (this.optionsGoals.length === 0) {
      this.openAutoGoals = false;
    }
  }

  public changeSkill () {
    this.showChoosedSkill = false;
    this.choosedSkill = null;
    this.showBtn = false;
    this.newSkill = false;
  }

  public changeLang (option) {
    const optLangs = _.remove(this.choosedLangname, {id: option.id});
    const langAPI = _.remove(this.choosedLang, (n) => {
      return n === option.id;
    });
    if (this.choosedLangname.length === 0 ) {
      this.showChoosedLangs = false;
      this.langRequired = true;
    }
  }

  public changeGoalsList(option, e): void {
    this.skillsExpected = true;
    const newList = _.filter(this.skillsExpList, function (f) { return f.id !== option.id; });
    const goalsAPI = _.remove(this.choosedGoals, (n) => {
      return n === option.id;
    });
    this.skillsExpList = newList;
  }

  // Functions of chanching selects payment
  agreeMoneyHandler(e) {
    this.moneyExpected = e.target.checked;
  }
  agreeServiceHandler(e) {
    this.servicesExpected = e.target.checked;
  }
  agreeSkillsHandler(e) {
    this.skillsExpected = e.target.checked;
    if (e.target.checked === true) {
      this.skillsExpList = this.myGoals;
      this.skillsExpList.forEach((el) => {
        this.choosedGoals.push(el.id);
      });
    } else {
      this.skillsExpList = [];
      this.choosedGoals = [];
    }
  }
  isShatedHandler(e) {
    this.isShared = e.target.checked;
  }
  trialHandler(e) {
    this.withTrial = e.target.checked;
  }

// Functions of chanching selects deggree
degreeHandler(e, openOther?: boolean) {
  this.universitySelected = e.target.checked;
  this.arrDegree.forEach(el => {
    if (el.name === e.target.name) {
      this.degree = el.str;
    } else {
      el.val = false;
    }
    if (openOther === true) {
      this.otherRequired = true;
      this.otherRequiredErr = 'If you choosed "Other" you must to fill this area';
    }
  });
}

// Set prices
pricingSet(e, name: string) {
  if (e.target.checked === true) {
    let defaultPrice = {currency: 'USD',
    type: null,
    value: null};
    if (name === 'individual') {
    defaultPrice.type = 0;
    this.disIndividVal = false;
    } else if (name === 'group') {
    defaultPrice.type = 1;
    this.disGroupVal = false;
    } else if (name === 'consultation') {
    defaultPrice.type = 2;
    this.disConsultationVal = false;
    } else {
    defaultPrice.type = 3;
    this.disExpertOpVal = false;
    }
    this.prices.push(defaultPrice);
  } else if (e.target.checked === false) {
    if (name === 'individual') {
      _.remove(this.prices, {type: 0});
      this.disIndividVal = true;
    } else if (name === 'group') {
      _.remove(this.prices, {type: 1});
      this.disGroupVal = true;
    } else if (name === 'consultation') {
      _.remove(this.prices, {type: 2});
      this.disConsultationVal = true;
    } else {
      _.remove(this.prices, {type: 3});
      this.disExpertOpVal = true;
    }
  }
}


valPayment(e, type: number) {
  if (e.target.value !== null) {
    this.prices.forEach(el => {
      if (el.type === type) {
        el.value = e.target.value;
      }
      });
}
}

  public saveBtn(skillName, currentLevel, descriptionSkill, traningExpertise, otherSelect?, otherinputText?, relevantExpirience?) {
    if ((!this.degree || this.degree === '') && otherSelect === false) {
      this.showErrorText =  'You missed field "Degree". You must to choose one field';
      this.actionName = 'ERROR';
      this.headerError = 'Error in line "Degree"';
      this.infoPopup.open();
    } else if ((!this.degree || this.degree === '') && otherSelect === true) {
      this.degree = otherinputText;
    }
    if (this.choosedLangname.length === 0) {
      this.showErrorText =  'You missed field "Education language". You must to choose language';
      this.actionName = 'ERROR';
      this.headerError = 'Error in line "Education language"';
      this.infoPopup.open();

    } else if (typeof this.choosedSkill !== 'number' && this.choosedLangname.length !== 0) {
      this.createdSkillToShare = {
        degree: this.degree,
        description: descriptionSkill,
        name: skillName,
        experience: relevantExpirience,
        expertise: traningExpertise,
        isShared: this.isShared,
        level: currentLevel,
        withTrial: this.withTrial,
        skillsExpected: this.skillsExpected,
        skills: this.choosedGoals,
        serviceExpected: this.servicesExpected,
        moneyExpected: this.moneyExpected,
        prices: this.prices,
        educationLanguage: this.choosedLang
        };
      } else {
        this.createdSkillToShare = {
          degree: this.degree,
          description: descriptionSkill,
          skillId: this.choosedSkill,
          experience: relevantExpirience,
          expertise: traningExpertise,
          isShared: this.isShared,
          level: currentLevel,
          withTrial: this.withTrial,
          skillsExpected: this.skillsExpected,
          skills: this.choosedGoals,
          serviceExpected: this.servicesExpected,
          moneyExpected: this.moneyExpected,
          prices: this.prices,
          educationLanguage: this.choosedLang
          };
      }
    this.data.postNewSkill(this.createdSkillToShare).subscribe((resp) => {
      if (resp.error === false || resp.status === 200) {
        this.data.getUser().subscribe((res) => {
          this.store.dispatch(new UpdateUsersSkills(res.data.keyData.skills));
          this.router.navigate(['/profile']);
        });
      }
    });
  }

}
