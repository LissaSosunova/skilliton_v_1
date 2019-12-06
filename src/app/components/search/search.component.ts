import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Store} from '@ngrx/store';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SetGlobalSearch } from 'src/app/state/actions/global-search.actions';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
@ViewChild('searchPageForm', { read: true, static: false  }) public searchPageForm: NgForm;
@Output() searchResult: any;
private loaded: boolean = false;
public searchControl: FormControl;
private searchPlaceholder: string;
private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.init();
    this.initSearchForm();
  }
  init () {
    const search$ = this.store.select('globalSearch').subscribe((state: any) => {
      if  (state !== undefined)  {
        this.searchResult = state;
        this.loaded = true;
      }
    });
  }

  // Search for global skill to obtain
  private initSearchForm(): void {
    this.searchPlaceholder = 'Start to type name of goal';
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearch(query);
        }
      });
  }

  setSearch(query: string) {
    this.data.getSearchAll(query).subscribe((data) => {
      if (data.error === false || data.status === 200) {

        this.store.dispatch(new SetGlobalSearch(data));
      }
    });
  }

  goToProfile () {
    this.router.navigate(['/profile']);
  }
}
