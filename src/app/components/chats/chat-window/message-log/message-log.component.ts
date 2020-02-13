import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { types } from 'src/app/types/types';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {
  @Input() message: Observable<any>;

  constructor() { }

  ngOnInit() {
  }

}
