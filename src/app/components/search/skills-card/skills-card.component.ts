import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../state/actions/mate.actions';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';
import { types } from '../../../types/types';
import { errorTypes } from '../../../shared/constants/errors';

@Component({
  selector: 'app-skills-card',
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.scss']
})
export class SkillsCardComponent implements OnInit {
  @ViewChild('infoPopup', { static: false }) public infoPopup: AlertModalComponent;
  @ViewChild('errorPopup', { static: false }) public errorPopup: AlertModalComponent;
  @Input() skills: any;
  @Output() actionName: string;
  @Output() headerError: any;
  @Output() details: string;
  @Output() recomend: string;
  @Output() isFooter: true;
  private ERROR_API: any = errorTypes.api.search;
  private avatar = 'assets/images/post-exaple2.jpg';

  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
    public alertModal: AlertModalComponent,
    public errortModal: ErrorModalComponent,
  ) { }

  ngOnInit() {
  }

  private openDetialsBlock(id, type?: string): void {
    const elems = Array.from(document.getElementsByTagName('div'));
    let elem;
    elems.forEach((el) => {
      if (el.id == id) {
        elem = el;
        elem.classList.toggle('non-vis');
      }
    });
    const condition = elem.classList.contains('non-vis');
    if (type === 'sendReqTO') {
      elem.classList.toggle('non-vis');
      if (condition === false) {
        elem.classList.toggle('non-vis');
      }
      this.reqTO(id);
    } else if (type === 'sendReqTS') {
      elem.classList.toggle('non-vis');
      if (condition === false) {
        elem.classList.toggle('non-vis');
      }
      this.reqTS(id);
    }
  }

  private reqTO(id: number): void {
    this.data.postReqMatchObtain(id).subscribe( (data) => { this.checkStatusData(data); } ,
    error => { this.getErrorCodeApi(error.status); });
  }
  private reqTS(id: number): void {
    this.data.postReqMatchShare(id).subscribe( (data) => { this.checkStatusData(data); } ,
    error => {  this.getErrorCodeApi(error.status); });
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
  getErrorCodeApi(data: number): void {
    const result = _.find(this.ERROR_API, function(o) { return o.code === data; });
    this.actionName = result.title;
    this.headerError = 'Error';
    this.recomend = 'View user profile to chech skill details.';
    this.isFooter = true;
    this.errorPopup.open();
 
   }
   // Check status of response, set tocken
   checkStatusData(data: any): void {
     if (data.error === false) {
      this.actionName = 'Your request was been sent.';
      this.headerError = 'Success';
      this.recomend = 'You can find your request in "My profie - My matches".';
      this.isFooter = true;
      this.errorPopup.open();
     }
   }
  public onPopupOpen(): void {
    this.infoPopup.open();
  }
}
