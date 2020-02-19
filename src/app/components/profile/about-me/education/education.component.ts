import { types } from 'src/app/types/types';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { NgForm, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { LoadUserData } from 'src/app/state/actions/user.actions';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  providers: [DatePipe]
})
export class EducationComponent implements OnInit {
  @Output() currChildUrl: 'education';
  @ViewChild('editEducationForm', {static: true}) public editEducationForm: NgForm;
  @Input() user: any;
  public educationExist: boolean = false;
  public userUploaded: boolean = false;
  public editableEducation: boolean = false;
  public chooseEducationType: boolean = false;
  public universities: Array<any>;
  public colleges: Array<any>;
  public highSchools: Array<any>;
  public schools: Array<any>;
  public courses: Array<any>;
  public alltypes = {} as any;
  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  public openAutoSearch: boolean;
  public nameSeted: boolean = false;
  public choosedFromList: boolean;
  public choosedId: number;
  public currentlyPeriod: boolean;
  private setAPIdata: any;
  public placeName: string;
  public type: number;
  public options: any;
  public dateFrom: string;
  public toDate: string;
  public specializationName: string;
  public degreeName: string;
  public educationPlace: any;
  public errorTextDate: 'Here is wrong date parameter.';

  constructor(
    private data: HttpService,
    private store: Store<any>,
    public datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.init();
    this.getEducationList();
    this.initSearchForm();
    this.initAPIdata();
  }

  init() {
    if (this.user === undefined || this.user === {}) {
      const user$$ = this.store.select('user').subscribe((state: any) => {
        if (state !== undefined || state) {
          this.user = state;
          this.user.keyData.education.length !== 0 ? this.educationExist = true : this.educationExist = false;
          this.userUploaded = true;
        }
        });
      } else {
        this.user.keyData.education.length !== 0 ? this.educationExist = true : this.educationExist = false;
        this.userUploaded = true;
      }
    }

    private initAPIdata(): void {
      this.setAPIdata = {
        periodOfTime: {
          dateFrom: '',
          dateTo: null
        },
        type: null
      };
    }
    // Get names and id of workplaces
    private getEducationList (): void {
      this.data.getEducation().subscribe((data) => {
        if (data) {
          this.alltypes = data.data;
          for (let key in this.alltypes) {
            if (key == '0') {
              this.alltypes[key].forEach((o) => {
                  o.srchStr = _.lowerCase(o.name);
                });
              this.universities = this.alltypes[key];
            } else if (key == '1') {
              this.alltypes[key].forEach((o) => {
                o.srchStr = _.lowerCase(o.name);
              });
              this.colleges = this.alltypes[key];
            } else if (key == '2') {
              this.alltypes[key].forEach((o) => {
                o.srchStr = _.lowerCase(o.name);
              });
              this.highSchools = this.alltypes[key];
            } else if (key == '3') {
              this.alltypes[key].forEach((o) => {
                o.srchStr = _.lowerCase(o.name);
              });
              this.schools = this.alltypes[key];
            } else if (key == '4') {
              this.alltypes[key].forEach((o) => {
                o.srchStr = _.lowerCase(o.name);
              });
              this.courses = this.alltypes[key];
            }
          }
          }
        });
    }
    private initSearchForm(): void {
      this.searchControl = new FormControl();
      this.searchControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
        .subscribe(query => {
          if (query) {
            this.setSearch(query);
          } else if (!query && this.nameSeted === true) {
            this.openAutoSearch = false;
          }
        });
    }
    public setSearch(query: string): void {
      const querySearch = _.lowerCase(query);
      let arr = [];
      this.type == 0 ?  arr = this.universities :
      this.type == 1 ? arr = this.colleges :
      this.type == 2 ? arr = this.highSchools :
      this.type == 3 ? arr = this.schools :
      arr = this.courses;
      const search = _.filter(arr, o => _.includes(o.srchStr, querySearch));
      this.openAutoSearch = true;
      this.options = search;
      if (this.options.length === 0) {
        this.openAutoSearch = false;
      }
    }

    public setValueFromDropDown(option) {
      this.choosedId = option.id;
      this.choosedFromList = true;
      this.nameSeted = true;
      this.openAutoSearch = false;
      // this.openSearchBlock = false;
      this.placeName = option.name;
      this.searchControl.reset({ value: option.name, disabled: false });
    }

    public addEducation() {
      this.chooseEducationType = true;
    }

    public openForm(n: number): void {
      this.type = n;
      this.chooseEducationType = false;
      this.editableEducation = true;
    }
    public outsideSearchClick():void {
      this.openAutoSearch = false;
    }
    public changeEducationPlace() {
      this.searchControl.reset({ value: '', disabled: false });
      this.nameSeted = false;
      this.choosedFromList = false;
    }
    public changeDate(type, e, fieldData): void {
      if (type === 'currPeriod') {
        if (e.target.checked === false) {
          this.toDate = '';
        } else if (e.target.checked === true) {
          this.currentlyPeriod = true;
          this.toDate = null;
        }
      } else if (type === 'fromDate') {
        this.dateFrom = this.datePipe.transform(fieldData, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      } else if (type === 'toDate') {
        this.toDate = this.datePipe.transform(fieldData, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      }
    }
    public cancel(e) {
      this.editEducationForm.reset();
      this.chooseEducationType = false;
      this.editableEducation = false;
      this.currentlyPeriod = false;
    }
    public saveBtn(placeName, edDegree, specialization, currentlyPeriod, fromDate, toDate): void {
      let dateFromVal = this.datePipe.transform(fromDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      let dateToVal;
      if (this.toDate !== null) {
        dateToVal = this.datePipe.transform(toDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      } else {
        dateToVal = null;
      }
      this.setAPIdata = {
        periodOfTime: {
          dateFrom: dateFromVal,
          dateTo: dateToVal
        },
        type: this.type
      };
      if (this.choosedFromList === false) {
        this.setAPIdata.name = placeName;
      } else if (this.choosedFromList === true) {
        this.setAPIdata.id = this.choosedId;
      }

      if (this.type !== 2 && this.type !== 3) {
        this.setAPIdata.degree = edDegree;
        this.setAPIdata.specialization = specialization;
      }
      this.data.postEducation(this.setAPIdata).subscribe((data) => {
        if (data.error === false) {
          this.store.dispatch(new LoadUserData());
          const newUser$ = this.store.select('user').subscribe((state: any) => {
            if  (state !== undefined)  {
              this.user = state;
              this.editableEducation = false;
            }
          });
          }
        });
    }
}
