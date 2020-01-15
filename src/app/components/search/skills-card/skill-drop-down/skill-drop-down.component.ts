import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-skill-drop-down',
  templateUrl: './skill-drop-down.component.html',
  styleUrls: ['./skill-drop-down.component.scss']
})
export class SkillDropDownComponent implements OnInit {

@Input() public skill: any;
@Input() public type: string;
@Input() public name: string;
@Output() public sendReq = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  public submith(id: any): void {
    this.sendReq.emit(id);
  }

}
