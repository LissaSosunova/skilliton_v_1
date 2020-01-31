import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { types } from 'src/app/types/types';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input() message: Observable<any>;
  @ViewChild('myCheck', {static: false}) public myCheck: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  public overOnMyCheck() {
    this.myCheck.nativeElement.classList.toggle('none-vis');
  }

}
