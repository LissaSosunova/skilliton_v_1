import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter, HostListener, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete,
  MatChipEvent,
  MatChipSelectionChange,
  MatChipAvatar,
  MatChipRemove,
  MatChipTrailingIcon,
  MatChipsDefaultOptions,
  MatChipList} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
export interface Item {
  name: string;
  value?: number;
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
  itemsNew= [];
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

    // Add our fruit
    if ((value || '').trim()) {
      console.log(value);
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
      console.log(oneItem, this.items);
    }
  }
}