import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material';
import { TransferService } from 'src/app/services/transfer.service';
import { ToastSuccessComponent } from '../shared/toasts/toast-success/toast-success.component';
import { ToastFailComponent } from '../shared/toasts/toast-fail/toast-fail.component';
import { ToastWarningComponent } from '../shared/toasts/toast-warning/toast-warning.component';

import { types } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  // default config
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private duration: number = 3000;

  constructor(private snackBar: MatSnackBar,
              private transferService: TransferService) { }

  public openToastFail(message: string, config?: MatSnackBarConfig): void {
    this.transferService.dataSet({name: 'toastMessage', data: message});
    config = this.initToastConfig(config);
    this.snackBar.openFromComponent(ToastFailComponent, config);
  }

  public openToastSuccess(message: string, config?: MatSnackBarConfig): void {
    config = this.initToastConfig(config);
    this.transferService.dataSet({name: 'toastMessage', data: message});
    this.snackBar.openFromComponent(ToastSuccessComponent, config);
  }

  public openToastWarning(message: string, config?: MatSnackBarConfig): void {
    config = this.initToastConfig(config);
    this.transferService.dataSet({name: 'toastMessage', data: message});
    this.snackBar.openFromComponent(ToastWarningComponent, config);
  }

  private initToastConfig(config?: MatSnackBarConfig): MatSnackBarConfig {
    config = config || {} as MatSnackBarConfig;
    config.verticalPosition = config.verticalPosition || this.verticalPosition;
    config.horizontalPosition = config.horizontalPosition || this.horizontalPosition;
    config.duration = config.duration || this.duration;
    return config;
  }
}
