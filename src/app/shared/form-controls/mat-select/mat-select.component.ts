import { Component, OnInit, Input } from '@angular/core';
import { InputAbstract, MakeProvider } from '../model/input-abstract';

@Component({
  selector: 'app-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss'],
  providers: [MakeProvider(MatSelectComponent)]
})
export class MatSelectComponent extends InputAbstract implements OnInit  {
  @Input() options: {label: string, value: string | number}[];

  constructor() {
    super();
   }

  ngOnInit() {
    super.init();
    super.subscribeFormControl();
  }

}