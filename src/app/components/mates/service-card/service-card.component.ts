import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'mate-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class MateServiceCardComponent implements OnInit {
  public services: any;
  public showServices: boolean = false;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    const services$ = this.store.select('mateProfile').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.services = state.keyData.services;
        if (this.services.length !== 0 ) {
          this.showServices = true;
        }
      }
    });
  }

}
