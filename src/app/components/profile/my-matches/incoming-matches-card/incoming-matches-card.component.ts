import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Store} from '@ngrx/store';
import * as _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMates } from '../../../../state/actions/mate.actions';
import { CongratsPopupComponent } from '../../../modals/congrats-popup/congrats-popup.component';
import { debug } from 'util';

@Component({
  selector: 'app-incoming-matches-card',
  templateUrl: './incoming-matches-card.component.html',
  styleUrls: ['./incoming-matches-card.component.scss']
})
export class IncomingMatchesCardComponent implements OnInit {
  @Input() match: any;
  private avatar = 'assets/images/post-exaple2.jpg';
  @Output() onChanged = new EventEmitter<boolean>();
  @Output() public actionName: string;
  @Output() public avatar1: string;
  @Output() public avatar2: string;
  @ViewChild('congrats', { static: false }) public congrats: CongratsPopupComponent;


  constructor(
    private store: Store<any>,
    private data: HttpService,
    public router: Router,
    private congratsPopup: CongratsPopupComponent
  ) { }

  ngOnInit() {
    // console.log(this.match)
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

  public matching(id: number) {
    this.data.getConfirmMaych(id, true).subscribe((data) => {
      if(data.error === false) {
        this.openCongratsPopup();
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

  public openCongratsPopup(): void {
    this.actionName = 'Congratulations!';
    this.avatar1 = 'assets/images/post-exaple.jpg';
    this.avatar2 ='assets/images/post-exaple2.jpg';
    this.congrats.open();
  }

  public goToChat(id): void{
    this.onChanged.emit(true);
    this.router.navigate(['/main/chats/chat-window/', id]);
  }
}
