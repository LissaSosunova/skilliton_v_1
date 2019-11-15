import { Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { NgForm, FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { EditUserProfileService } from '../../../../services/edit-user-profile.service';

@Component({
  selector: 'app-places-of-residence',
  templateUrl: './places-of-residence.component.html',
  styleUrls: ['./places-of-residence.component.scss']
})
export class PlacesOfResidenceComponent implements OnInit {
  @Output() currChildUrl: 'places-of-residence';
  @ViewChild('editPlacesForm', { read: true, static: false  }) public editPlacesForm: NgForm;
  @Input() user: any;
  public userUploaded: boolean = false;
  private editablePlaceFrom: boolean = false;
  private editablePlaceLive: boolean = false;
  constructor(
    private data: HttpService,
    private store: Store<any>,
    private editData: EditUserProfileService,
  ) { }

  ngOnInit() {
    this.init();
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
}

private changePlaceFrom() {
  this.editablePlaceFrom = !this.editablePlaceFrom;
}
private cancelPlaceFrom() {
  // this.lastNameErr = false;
  this.editablePlaceFrom = false;
}
private changePlaceLive() {
  this.editablePlaceLive = !this.editablePlaceLive;
}
private chancelPlaceLive() {
  this.editablePlaceLive = false;
}

}
