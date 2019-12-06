import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../../state/actions/mate.actions';

@Component({
  selector: 'app-active-matches-card',
  templateUrl: './active-matches-card.component.html',
  styleUrls: ['./active-matches-card.component.scss']
})
export class ActiveMatchesCardComponent implements OnInit {
  @Input() match: any;
  private avatar = 'assets/images/post-exaple2.jpg';
  @Output() onChanged = new EventEmitter<boolean>();
  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  viewProfile(email: string) {
    const params = email;
    this.data.getMate(params).subscribe((data) => {
      if (data.error === false || data.status === 200) {
        this.store.dispatch(new LoadMates(data));
        this.router.navigate(['/view-profile', {mate: email}]);
      }
    });
  }

  public dismatch(id: number) {
    this.data.getConfirmMaych(id, false).subscribe((data) => {
      if(data.error === false) {
        this.onChanged.emit(true);
      }
    });
  }
  private openDetialsBlock(id): void {
    const elems = Array.from(document.getElementsByTagName('div'));
    let elem;
    elems.forEach((el) => {
      if (el.id == id) {
        elem = el;
        elem.classList.toggle('non-vis');
      }
    });
  }
}
