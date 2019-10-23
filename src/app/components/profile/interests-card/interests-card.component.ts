import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';

@Component({
  selector: 'app-interests-card',
  templateUrl: './interests-card.component.html',
  styleUrls: ['./interests-card.component.scss']
})
export class InterestsCardComponent implements OnInit {
  public interests: Observable<any>;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {

    const interests$ = this.store.select('user').subscribe((state: any) => {
      if(state !== undefined || state) {
        this.interests = state.keyData.interests;
      }
    });
  }

}
