import { Component, OnInit, Input } from '@angular/core';
import { types } from '../../../types/types';
import { PopupControls, PopupControlsService } from '../../../services/popup-controls.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  public popup: PopupControls;
  public popupConfig: types.FormPopupConfig;
  @Input() public actionName?: string;
  @Input() public header?: string = "Info";
  @Input() public details?: string;
  @Input() public recomend?: string;

  constructor(
    private popupControlsService: PopupControlsService
  ) { }

  ngOnInit() {
    this.popup = this.popupControlsService.create(true);
    this.popupConfig = {
      header: this.header,
      isHeaderCloseBtn: true,
      isFooter: false,
      isHeader: true,
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