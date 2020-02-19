import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EditUserProfileService } from '../../../../services/edit-user-profile.service';
import { HttpService } from '../../../../services/http.service';
import { LoadLocations, LoadCities } from 'src/app/state/actions/locations.actions';
import { LoadUserData } from 'src/app/state/actions/user.actions';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-places-of-residence',
  templateUrl: './places-of-residence.component.html',
  styleUrls: ['./places-of-residence.component.scss']
})
export class PlacesOfResidenceComponent implements OnInit {
  @Output() currChildUrl: 'places-of-residence';
  @ViewChild('editPlacesForm', { read: true }) public editPlacesForm: NgForm;
  @Input() user: any;
  public userUploaded: boolean = false;
  public editablePlaceFrom: boolean = false;
  public editablePlaceLive: boolean = false;
  public openAutoCountr: boolean = false;
  public openAutoCity: boolean = false;
  public disabledCity: boolean = true;
  public searchCountriesControl: FormControl;
  public searchCityControl: FormControl;
  public searchCountriesControlLive: FormControl;
  public searchCityControlLive: FormControl;
  private unsubscribe$: Subject<void> = new Subject();
  public countries: any;
  public cities: any;
  public options: any;
  public optionsCity: any;
  public choosedCountryname: string = '';
  public choosedCityname: string = '';
  public cityNames: any;
  public cityNames2: any;
  public countrNames: any;
  public countrNames2: any;

  constructor(
    private data: HttpService,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.init();
    this.initSearchCountriesForm();
    this.initSearchCityForm();
    this.initSearchCountriesLive();
    this.initSearchCityLive();
  }

  init() {
    if (this.user === undefined || this.user === {}) {
      const user$$ = this.store.select('user').subscribe((state: any) => {
        if(state !== undefined || state) {
          this.user = state;
          this.userUploaded = true;
        }
      });
  }
// Write countries to the store
    this.store.dispatch(new LoadLocations());
}

public changePlaceFrom() {
  this.editablePlaceFrom = !this.editablePlaceFrom;
}
public cancelPlaceFrom() {
  this.editablePlaceFrom = false;
  this.searchCityControl.reset({ value: '', disabled: false });
  this.searchCountriesControl.reset({ value: '', disabled: false });
  this.choosedCountryname = '';
  this.choosedCityname = '';
}
public changePlaceLive() {
  this.editablePlaceLive = !this.editablePlaceLive;
}
public cancelPlaceLive() {
  this.editablePlaceLive = false;
  this.searchCityControl.reset({ value: '', disabled: false });
  this.searchCountriesControl.reset({ value: '', disabled: false });
  this.choosedCountryname = '';
  this.choosedCityname = '';
}
// Search places of birth
private initSearchCountriesForm(): void {
  this.searchCountriesControl = new FormControl();
  this.searchCountriesControl.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
    .subscribe(query => {
      if (query) {
        this.setSearch(query);
      } else if (!query || query === '') {
        this.openAutoCountr = false;
      }
    });
  }

  private initSearchCityForm(): void {
    this.searchCityControl = new FormControl();
    this.searchCityControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearchCity(query);
        } else if (!query || query === '') {
          this.openAutoCity = false;
        }
      });
    }

    public setSearch(query: string): void {
      const countries = this.store.select('locations').subscribe((state: any) => {
        if(typeof state !== undefined || state.countries.length > 1) {
          this.countries = state.countries;
        }
      });
      const search = _.filter(this.countries, o => _.includes(o.country, query));
      this.openAutoCountr = true;
      this.options = search;
      if (this.options.length === 0) {
        this.openAutoCountr = false;
      }
    }
    public setSearchCity(query: string): void {
      const cities = this.store.select('locations').subscribe((state: any) => {
        if(typeof state !== undefined) {
          this.cities = state.target.cities;
        }
      });
      const search = _.filter(this.cities, o => _.includes(o, query));
      this.openAutoCity = true;
      this.optionsCity = search;
      if (this.options.length === 0) {
        this.openAutoCity = false;
      }
    }
// Search places of live
  private initSearchCountriesLive(): void {
    this.searchCountriesControlLive = new FormControl();
    this.searchCountriesControlLive.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearchLive(query);
        } else if (!query || query === '') {
          this.openAutoCountr = false;
        }
      });
    }

  private initSearchCityLive(): void {
    this.searchCityControlLive = new FormControl();
    this.searchCityControlLive.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(query => {
        if (query) {
          this.setSearchCityLive(query);
        } else if (!query || query === '') {
          this.openAutoCity = false;
        }
      });
    }
  public setSearchLive(query: string): void {
    const countries = this.store.select('locations').subscribe((state: any) => {
      if(typeof state !== undefined || state.countries.length > 1) {
        this.countries = state.countries;
      }
    });
    const search = _.filter(this.countries, o => _.includes(o.country, query));
    this.openAutoCountr = true;
    this.options = search;
    if (this.options.length === 0) {
      this.openAutoCountr = false;
    }
  }
  public setSearchCityLive(query: string): void {
    const cities = this.store.select('locations').subscribe((state: any) => {
      if(typeof state !== undefined) {
        this.cities = state.target.cities;
      }
    });
    const search = _.filter(this.cities, o => _.includes(o, query));
    this.openAutoCity = true;
    this.optionsCity = search;
    if (this.options.length === 0) {
      this.openAutoCity = false;
    }
  }

  public setValueCountriesFromDropDown(option) {
    this.choosedCountryname = option.country;
    this.openAutoCountr = false;
    this.searchCityControl.reset({ value: '', disabled: false });
    this.searchCountriesControl.reset({ value: '', disabled: false });
    this.store.dispatch(new LoadCities(option.id));
  }

  public setValueCity(option) {
    this.choosedCityname = option;
    this.openAutoCity = false;
    this.searchCityControl.reset({ value: '', disabled: false });
    this.searchCountriesControl.reset({ value: '', disabled: false });
  }

  public savePlaceOfBirth() {
    if (this.choosedCountryname !== '' && this.choosedCityname !== '') {
      const newVal = {
        city: this.choosedCityname,
        country: this.choosedCountryname};
      this.sendData('placeOfBirth', newVal);
      this.cancelPlaceFrom();
    }
  }

  public savePlaceOfLive() {
    if (this.choosedCountryname !== '' && this.choosedCityname !== '') {
      const newVal = {
        city: this.choosedCityname,
        country: this.choosedCountryname};
      this.sendData('placeOfResidence', newVal);
      this.cancelPlaceLive();
    }
  }

  public sendData(key: string, data: any): void {
    const params = {[key]: data};
    this.data.postNewProfileData(params).subscribe((res) => {
      if (res) {
        this.store.dispatch(new LoadUserData());
      }
    });
  }
} 
