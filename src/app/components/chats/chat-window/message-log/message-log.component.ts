import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { types } from 'src/app/types/types';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {
  @Input() message: types.Message;

  constructor() { }

  ngOnInit() {
  }

}
