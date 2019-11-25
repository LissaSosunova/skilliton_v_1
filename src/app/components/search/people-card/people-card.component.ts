import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../state/actions/mate.actions';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss']
})
export class PeopleCardComponent implements OnInit {
  @Input() people: any;
  private avatar = 'assets/images/post-exaple2.jpg';
  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
  ) { }

  ngOnInit() {

    // const skills$ = this.store.select('globalSearch').subscribe((state: any) => {
    //   if  (state !== undefined)  {
    //   }
    // });
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

  public interested(mail: string): void {
    this.data.getSubscriptionMate(mail, true).subscribe((resp) => {
      console.log(resp);
    })

  }

  public notInterested(mail: string): void {
    this.data.getSubscriptionMate(mail, false).subscribe((resp) => {
      console.log(resp);
    })

  }

}
