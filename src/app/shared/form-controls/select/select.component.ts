import { Component, OnInit, Input, HostListener,
  ElementRef,
  Output,
  EventEmitter,
  forwardRef } from '@angular/core';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
})

export class SelectComponent implements ControlValueAccessor, OnInit {
  _value: any;
  currentOption: any;
  isOpened = false;

  @Input() options;
  @Input() init;
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() showAdd: boolean;
  @Input() showRemove: boolean;
  @Input() disableSorting: boolean;

  @Output() change = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() selectedValue = new EventEmitter();


  constructor(private element: ElementRef) { }

  get value() {
    return this._value && this._value.value;
  }

  set value(val) {
    if (val === '') {
      this._value = val;
      this.propagateChange(val);
      this.change.next(val);
      return;
    }
    if ((!val && val !== 0) || !this.options) { return; }
    const value = this.options.find(o => o.value === val);
    if (!value) { return; }
    this._value = value;
    this.propagateChange(this._value.value);
    this.change.next(this._value.value);
    this.close();
  }

  ngOnInit() {
    if (!this.init) { return; }
    setTimeout(() => {
      this._value = this.init;
      this.propagateChange(this.init.value);
    });
  }


  writeValue(value: any) {
    this.value = value;
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  toggleSelect(): void {
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }

  sortOptions() {
    if (!this.disableSorting) {
      // some array could be immutable
      return [...this.options].sort((a, b) => {
        let valA = a.value || a;
        let valB = b.value || b;
        if (valA == 'all') return -1;
        if (valB == 'all') return 1;
        if (valA > valB) return 1;
        if (valA < valB) return -1;
        return 0;
      });
    } else {
      return this.options;
    }
  }

  pickValueHandler(option) {
    this.value = option.value;
    this.selectedValue.emit(this.value);
  }

  resetToNull() {
    this._value = null;
    this.propagateChange(this._value);
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) { return; }

    const clickedInside = this.element.nativeElement.contains(targetElement);

    if (!clickedInside) { this.close(); }
  }

}