import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-items',
  templateUrl: './dropdown-items.component.html',
  styleUrls: ['./dropdown-items.component.scss']
})
export class DropdownItemsComponent implements OnInit {
@Input() options: Array<any>;
public properties: Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
