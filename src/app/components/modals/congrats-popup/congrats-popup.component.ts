import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { types } from '../../../types/types';
import { PopupControls, PopupControlsService } from '../../../services/popup-controls.service';

@Component({
  selector: 'app-congrats-popup',
  templateUrl: './congrats-popup.component.html',
  styleUrls: ['./congrats-popup.component.scss']
})
export class CongratsPopupComponent implements OnInit {

  public popup: PopupControls;
  public popupConfig: types.FormPopupConfig;
  @Input() public actionName?: string;
  @Input() public header?: string;
  @Input() public details?: string;
  @Input() public recomend?: string;
  @Input() public avatar1?: string;
  @Input() public avatar2?: string;
  @Input() public footerType?: number;
  @Input() public fotter_2_ActionName?: string | 'Ok';
  @Input() public fotter_2_CancelName?: string | 'Cancel';
  @Output() public isHeaderCloseBtn: false;
  @Output() public onSubmit = new EventEmitter<void>();

  public position: 'top-center';

  // button order
  public closeBtnOrder: number = 1;
  public removeBtnOrder: number = 2;
  public submitBtnOrder: number = 3;
  public conf: types.FormPopupConfig;

  public constructor(private popupControlsService: PopupControlsService) {

  }

  ngOnInit() {
    this.popup = this.popupControlsService.create(true);
    this.popupConfig = {
      header: this.header,
      isHeaderCloseBtn: true,
      isFooter: true,
      isHeader: true,
      footer: {
        isCloseBtn: false,
        footerType: 2
      },
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