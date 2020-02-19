import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../../state/actions/mate.actions';

@Component({
  selector: 'app-interested-persons',
  templateUrl: './interested-persons.component.html',
  styleUrls: ['./interested-persons.component.scss']
})
export class InterestedPersonsComponent implements OnInit {
  @Input() person: any;
  public avatar = 'assets/images/post-exaple2.jpg';
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
        this.router.navigate(['/main/view-profile', {mate: email}]);
      }
    });
  }
  change(option) {
    if (option !== null) {
      this.onChanged.emit(option);
    }
  }
}
