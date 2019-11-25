import { Component, OnInit, Input } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../state/actions/mate.actions';

@Component({
  selector: 'app-skills-card',
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.scss']
})
export class SkillsCardComponent implements OnInit {
  @Input() skills: any;
  private avatar = 'assets/images/post-exaple2.jpg';

  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  public sendReqTS(id): void {
    this.reqTS(id);
  }
  public sendReqTO(id): void {
    this.reqTO(id);
  }

  public match(share, obtain):void {
    if (share.length !==0){
      share.forEach((item) => {
        this.reqTS(item.skillId);
      });
    } else if (obtain.length !==0){
      obtain.forEach((item) => {
        this.reqTO(item.skillId);
      });
    }
  }

  private reqTO(id: number): void {
    this.data.postReqMatchObtain(id).subscribe((resp) => {
      console.log(resp);
    })
  }
  private reqTS(id: number): void {
    this.data.postReqMatchShare(id).subscribe((resp) => {
      console.log(resp);
    })
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
}
