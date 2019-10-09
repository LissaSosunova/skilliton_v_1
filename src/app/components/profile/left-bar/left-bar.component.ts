import {Component, OnDestroy, OnInit, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { types } from '../../../types/types';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  @Input() user: types.NewUser;
  @Input() myGoals = [] as any;
  @Input() currChildUrl: string;
  public activeUrl: any;
  @ViewChild('currTab', {static: false}) public currTab: string;
  constructor(
    private router: Router,
    private transferService: TransferService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(): void {
    if (this.currTab === undefined) {
      this.currTab = 'general';
    }
  }

  public switcher(url: string, tab: string): void {
    this.currTab = tab;
    this.activeUrl = url;
    this.router.navigate([url]);
  }

}
