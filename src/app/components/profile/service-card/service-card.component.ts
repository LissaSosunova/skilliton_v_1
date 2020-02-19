import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  public services: Observable<any>;
  public showServices: boolean = false;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    const services$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.services = state.keyData.services;
        if (state.keyData.services.length !== 0) {
          this.showServices = true;
        }
      }
    });
  }

}
