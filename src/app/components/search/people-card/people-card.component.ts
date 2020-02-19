import { ToastsService } from './../../../services/toasts.service';
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
  public avatar = 'assets/images/post-exaple2.jpg';
  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
    public toastService: ToastsService
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

  public subscribe(mail: string, lastName: string, name: string): void {
    this.data.getSubscriptionMate(mail, true).subscribe((resp) => {
      this.toastService.openToastSuccess("You are following " + lastName + " " +name + "'s post and library updates.");
    });

  }

  public unsubscribe(mail: string, lastName: string, name: string): void {
    this.data.getSubscriptionMate(mail, false).subscribe((resp) => {
      this.toastService.openToastWarning("You stop following " + lastName + " " +name + "'s post and library updates.");
    });

  }

}
