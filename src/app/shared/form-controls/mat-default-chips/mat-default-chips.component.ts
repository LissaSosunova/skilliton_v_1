import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatChipInputEvent, } from '@angular/material';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
export interface Item {
  name: string;
  id?: number;
}

@Component({
  selector: 'app-mat-default-chips',
  templateUrl: './mat-default-chips.component.html',
  styleUrls: ['./mat-default-chips.component.scss']
})
export class MatDefaultChipsComponent extends InputAbstract implements  OnInit {
  myControl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  itemsNew = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() items?: Item[] = [];
  @Input() placeholder?: string;




  constructor() { 
    super();
  }

  ngOnInit() {
    super.init();
    super.subscribeFormControl();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our item
    if ((value || '').trim()) {
      this.itemsNew.push({name: value.trim(), value: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(oneItem: Item): void {
    const index = this.items.indexOf(oneItem);
    
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
}