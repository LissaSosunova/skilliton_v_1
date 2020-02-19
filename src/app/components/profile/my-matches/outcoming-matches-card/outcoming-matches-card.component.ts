import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../../state/actions/mate.actions';

@Component({
  selector: 'app-outcoming-matches-card',
  templateUrl: './outcoming-matches-card.component.html',
  styleUrls: ['./outcoming-matches-card.component.scss']
})
export class OutcomingMatchesCardComponent implements OnInit {
  @Input() match: any;
  @Output() onChanged = new EventEmitter<boolean>();
  public avatar = 'assets/images/post-exaple2.jpg';
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
        this.router.navigate(['/main/view-profile', {mate: email}]);
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
  public openDetialsBlock(id): void {
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
