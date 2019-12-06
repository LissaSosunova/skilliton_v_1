import { Component, OnInit, Input } from '@angular/core';
import { types } from '../../../types/types';
import { PopupControls, PopupControlsService } from '../../../services/popup-controls.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  public popup: PopupControls;
  public popupConfig: types.FormPopupConfig;
  @Input() public actionName?: string;
  @Input() public header?: string = "Info";
  @Input() public details?: string;
  @Input() public recomend?: string;
  @Input() public isFooter?: boolean;
  @Input() public isError?: boolean;

  constructor(
    private popupControlsService: PopupControlsService
  ) { }

  ngOnInit() {
    this.popup = this.popupControlsService.create(true);
    this.popupConfig = {
      header: this.header,
      isHeaderCloseBtn: true,
      isFooter: this.isFooter,
      isHeader: true,
      isError: true,
      footer: {
        isCloseBtn: false,
        submitBtnText: 'OK'
      }
  }
  }

  public open(): void {
    if (this.popup) {
      this.popup.open();
    }

  }

  public onClose (): void {
    if (this.popup) {
      this.popup.close();
    }
  }
}