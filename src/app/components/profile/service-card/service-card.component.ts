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
  private showServices: boolean = false;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    const services$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.services = state.keyData.myServices;
        if (state.keyData.myServices.length !== 0) {
          this.showServices = true;
        }
      }
    });
  }

}
