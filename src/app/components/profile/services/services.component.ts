import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { LoadTags } from '../../../state/actions/filters.actions';
import { LoadUserData, UpdateUsersServices } from '../../../state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store} from '@ngrx/store';
import { types } from '../../../types/types';
import * as _ from 'lodash';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  @ViewChild('serviceDataForm', { read: true, static: false  }) public serviceDataForm: NgForm;
  public user: Observable<types.NewUser>;
  public activeUrl: string = '/profile/services';
  public searchControl: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  private openAuto: boolean = false;
  private showBtn: boolean = false;
  private btnConfirm: boolean = false;
  public tags: any;
  public tagsServices = [] as any;
  public options: any;
  public myServices = [] as any;

  public showChoosedService: boolean = false;
  public choosedService: number;
  public choosedServicename: string;
  private params: types.AddServiceAPI;

  @Input() currTab: string;
  @Input() userUploaded: boolean = false;
  @Output() servicePlaceholder: string;

  fileData = null;

  constructor(
    private data: HttpService,
    private router: Router,
    private store: Store<types.NewUser>,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.init();
    this.initSearchForm();
  }
  private init(): void {
    this.store.dispatch(new LoadUserData());
    this.store.dispatch(new LoadTags());
    const tags$ = this.store.select('filters').subscribe((state: any) => {
      if  (state !== undefined || state && state.skills.length > 1)  {
        this.tags = state;
      }
    });
    this.getUserData();
  }

  private getUserData(): void {

    this.actRoute.data.subscribe(data => {
      this.user = data.user$.data;
      this.myServices =  data.user$.data.keyData.services;
      this.userUploaded = true;
    });
}

  private initSearchForm(): void {
    this.servicePlaceholder = 'Start to type name of service';
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
    this.tagsServices = this.tags.services;
    const result1 = _.differenceBy(this.tagsServices, this.myServices, 'id');
    this.options = result1;
    const search = _.filter(this.tagsServices, o => _.includes(o.srchStr, querySearch));
    this.openAuto = true;
    if (this.user) {
      const result = _.differenceBy(search, this.myServices, 'id');
      this.options = result;
    } else {
      this.options = search;
    }
    if (this.options.length === 0) {
      this.openAuto = false;
      this.showBtn = true;
    }
  }

  public setValueFromDropDown(option) {
    this.showChoosedService = true;
    this.choosedService = option.id;
    this.choosedServicename = option.name;
    this.openAuto = false;
  }
  public setValue(val) {
    if (val !== null) {
      setTimeout(() => {
        this.showChoosedService = true;
        this.choosedServicename = val;
        this.openAuto = false;
        this.showBtn = true;
      });
    }
  }
  public changeService () {
    this.showChoosedService = false;
    this.choosedService = null;
    this.showBtn = false;
  }

  public outsideSearchClick(): void {
    this.openAuto = false;
  }
// Upload files https://www.tutsmake.com/new-angular-7-upload-file-image-example/
fileProgress(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  this.btnConfirm = true;
}

onSubmit() {
  const formData = new FormData();
  formData.append('file', this.fileData);
  // this.http.post('url/to/your/api', formData)
  //   .subscribe(res => {
  //     console.log(res);
  //     alert('SUCCESS !!');
  //   })
}

  saveBtn() {
    if (typeof this.choosedService === 'number') {
      this.params = {id: this.choosedService};
    } else {
      this.params = {name: this.choosedServicename};
    }
    this.data.postNewService(this.params).subscribe((data) => {
      if (data.error === false || data.status === 200) {
        this.data.getUser().subscribe((res) => {
          this.store.dispatch(new UpdateUsersServices(res.data.keyData.services));
          this.router.navigate(['/profile']);
        });
      }
    });
  }
}
