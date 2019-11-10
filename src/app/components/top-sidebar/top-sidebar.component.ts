import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RouterService } from '../../services/router.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { NgForm, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Store} from '@ngrx/store';
import { SetGlobalSearch } from 'src/app/state/actions/global-search.actions';

@Component({
  selector: 'app-top-sidebar',
  templateUrl: './top-sidebar.component.html',
  styleUrls: ['./top-sidebar.component.scss']
})
export class TopSidebarComponent implements OnInit {

  public currParentUrl: string;
  public currChildUrl: string;
  private searchVis: boolean = false;
  public searchControl: FormControl;
  public search: string = '';
  private unsubscribe$: Subject<void> = new Subject();
  @Input() public disabled?: boolean = false;
  @Output() public reset: EventEmitter<void> = new EventEmitter<void>();

  constructor(public router: Router,
              private activateRouter: ActivatedRoute,
              private routerService: RouterService,
              private sessionStorageService: SessionstorageService,
              private localstorageService: LocalstorageService,
              private data: HttpService,
              private store: Store<any>,
              ) { }

  ngOnInit() {
    this.getCurrentRoute();
    this.initSearchForm();
  }

  private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/');
      const viewMateProfile = urlSegments[1].split(";mate=");
      this.currParentUrl = urlSegments[1];
      if (viewMateProfile.length > 1 ) {
        this.currParentUrl = viewMateProfile[0];
      }
      if (this.currParentUrl === '/' && !this.currParentUrl) {
        this.currParentUrl = 'login';
      }
      if (urlSegments.length > 2) {
        this.currChildUrl = urlSegments[2];
        const childSegments = this.currChildUrl.split('?');
        this.currChildUrl = childSegments[0];
      } else {
        this.currChildUrl = '';
      }
      const unknown = url.split("_code=");
      if (unknown.length > 1 && this.currParentUrl !== 'view-profile') {
        this.currParentUrl = 'unknownPage';
      }
    });
   }

   private exitApp() {
    this.localstorageService.removeValue('user');
    this.sessionStorageService.removeValue('_token');
    this.sessionStorageService.removeValue('tokenType');
    this.unsubscribe$.complete();
    this.router.navigate(['']);
   }

   openSearch() {
     this.searchVis = !this.searchVis;
   }

   private initSearchForm(): void {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearch(query);
        } else if (!query || query === '') {
          this.searchVis = false;
          this.searchControl.reset();
        }
      });
  }
  setSearch(query: string) {
    this.data.getSearchAll(query).subscribe((data) => {
      if (data.error === false || data.status === 200) {
        this.searchControl.reset({ value: '', disabled: false });
        this.store.dispatch(new SetGlobalSearch(data));
        this.router.navigate(['/search']);
      }
    });
  }
}
