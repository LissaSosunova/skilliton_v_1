import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'mate-interest-card',
  templateUrl: './interest-card.component.html',
  styleUrls: ['./interest-card.component.scss']
})
export class MateInterestCardComponent implements OnInit {
  public interests: any;
  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    const interests$ = this.store.select('mateProfile').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.interests = state.keyData.interests;
      }
    });
  }

}
