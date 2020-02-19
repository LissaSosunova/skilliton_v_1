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
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  providers: [DatePipe]
})
export class WorkComponent implements OnInit {
  @Output() currChildUrl: 'work';
  @ViewChild('editWorkForm', {static: true}) public editWorkForm: NgForm;
  @Input() user: any;
  public userUploaded: boolean = false;
  public companies: Array<any>;
  public editableWork: boolean = false;
  public workExist: boolean = false;
  public currentlyPeriod: boolean = false;
  public dateFrom: string;
  public toDate: string;
  public openAutoSearch: boolean = false;
  public openSearchBlock: boolean = false;
  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  private setAPIdata: any;
  public choosedComp: boolean = false;
  public options: any;
  public nameSeted: boolean = false;
  public positionSeted: boolean = false;
  public companyName: string;
  public positionName: string;
  public workPosition: string;
  public workPlace: string;

  constructor(
    private data: HttpService,
    private store: Store<any>,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.init();
    this.getWorkList();
    this.initSearchForm();
    this.initAPIdata();
  }

  init() {
    if (this.user === undefined || this.user === {}) {
      const user$$ = this.store.select('user').subscribe((state: any) => {
        if (state !== undefined || state) {
          this.user = state;
          this.user.keyData.workExperience.length !== 0 ? this.workExist = true : this.workExist = false;
          this.userUploaded = true;
        }
        });
      } else {
        this.user.keyData.workExperience.length !== 0 ? this.workExist = true : this.workExist = false;
        this.userUploaded = true;
      }
    }

    private initAPIdata(): void {
      this.setAPIdata = {
        periodOfTime: {
          dateFrom: '',
          dateTo: ''
        },
        position: ''
      };
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

    // Get names and id of workplaces
    private getWorkList (): void {
      this.data.getWork().subscribe((data) => {
        if (data) {
          const comps = data.data;
          comps.forEach((o) => {
            o.srchStr = _.lowerCase(o.companyName);
          });
          this.companies = comps;
          }
        });
    }

    public addWork() {
      this.editableWork = true;
      this.openSearchBlock = true;
    }

    public editPositionNameFn(id) {
      console.log(id);
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

    public openSearch(): void {
      this.openAutoSearch = true;
    }
    public setSearch(query: string): void {
      const querySearch = _.lowerCase(query);
      const search = _.filter(this.companies, o => _.includes(o.srchStr, querySearch));
      this.openAutoSearch = true;
      this.options = search;
      if (this.options.length === 0) {
        this.openAutoSearch = false;
      }
    }

    public setValueFromDropDown(option) {
      this.setAPIdata.id = option.id;
      this.choosedComp = true;
      this.nameSeted = true;
      this.openAutoSearch = false;
      this.openSearchBlock = false;
      this.companyName = option.companyName;
      this.searchControl.reset({ value: option.companyName, disabled: false });
    }
    public outsideSearchClick():void {
      this.openAutoSearch = false;
    }
    public changeWorkplace(): void {
      this.searchControl.reset({ value: '', disabled: false });
      this.nameSeted = false;
      this.choosedComp = false;
      this.openSearchBlock = true;
    }
    public saveBtn(workPlace, workPosition, currentlyPeriod, fromDate, toDate): void {
      this.dateFrom = this.datePipe.transform(fromDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      if (this.toDate !== null) {
        this.toDate = this.datePipe.transform(toDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      }
      if (this.choosedComp === false) {
        this.setAPIdata = {
          name: workPlace,
          periodOfTime: {
            dateFrom: this.dateFrom,
            dateTo: this.toDate
          },
          position: workPosition
        };
      } else if (this.choosedComp === true) {
        this.setAPIdata.periodOfTime = {
            dateFrom: this.dateFrom,
            dateTo: this.toDate
        };
        this.setAPIdata.position = workPosition;
      }

      this.data.postWork(this.setAPIdata).subscribe((data) => {
        if (data.error === false) {
          this.store.dispatch(new LoadUserData());
          const newUser$ = this.store.select('user').subscribe((state: any) => {
            if  (state !== undefined)  {
              this.user = state;
              this.editableWork = false;
            }
          });
          }
        });
    }

    public updateUserData(): void {
      this.store.dispatch(new LoadUserData());
      const newUser$ = this.store.select('user').subscribe((state: any) => {
        if  (state !== undefined)  {
          this.user = state;
        }
      });
    }
}
