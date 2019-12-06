import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './custom-chips.component.html',
  styleUrls: ['./custom-chips.component.scss']
})
export class CustomChipsComponent implements OnInit {
  @Input() options: Array<any>;
  @Output() onChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  change(option) {
    if (option !== null) {
      this.onChanged.emit(option);
    }
  }
}
