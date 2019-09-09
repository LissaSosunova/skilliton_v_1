import { Component, OnInit } from '@angular/core';
import { PopupControls, PopupControlsService } from '../../../services/popup-controls.service';
import { types } from '../../../types/types';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-leave-popup',
  templateUrl: './leave-popup.component.html',
  styleUrls: ['./leave-popup.component.scss']
})
export class LeavePopupComponent implements OnInit {

  public popup: PopupControls;
  public popupConfig: types.FormPopupConfig;
  public actionSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private popupControlsService: PopupControlsService,) { }

  ngOnInit() {
    this.popup = this.popupControlsService.create(true);
    this.popupConfig = {
      header: 'Confirm action',
      isHeaderCloseBtn: true,
      isFooter: true,
      isHeader: true,
      footer: {
        isCloseBtn: true,
        submitBtnText: 'OK'
      }
    };
    this.actionSubject.next(false);
  }

  public onClose (): void {
    if (this.popup) {
      this.popup.close();
      this.actionSubject.next(false);
    }
  }

  public onOpen(): Observable<boolean> {
    if (this.popup) {
      this.popup.open();
    }
    return new Observable(observer => {
      this.actionSubject.asObservable()
        .subscribe(isConfirmed => {
          observer.next(isConfirmed);
        }
      );
    });
  }

  public onSubmit(): void  {
    this.actionSubject.next(true);
  }
}
