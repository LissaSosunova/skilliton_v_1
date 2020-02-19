import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
@Component({
  selector: 'app-input-global-search',
  templateUrl: './input-global-search.component.html',
  styleUrls: ['./input-global-search.component.scss']
})
export class InputGlobalSearchComponent extends InputAbstract implements OnInit, OnChanges{

  @Output() public reset: EventEmitter<void> = new EventEmitter<void>();
  @Input() newValue?: string;
  public isValue: boolean = false;
  @Input() public maxLength?: number = 300; // default value
  @Input() label?: string;
  public showMaxInputMessageError: boolean = false;
  public maxLengthLimit: number;
  public showContent: boolean = false;

  @ViewChild('searchInput') private input: ElementRef;

  constructor() {
    super();
   }

  ngOnChanges() {
    if (typeof this.value === 'string' && this.value.length > 0) {
      this.isValue = true;
    } else {
      this.isValue = false;
    }
  }

  ngOnInit() {
    super.init();
    super.subscribeFormControl();
    setTimeout(() => {
      this.isValue = !!this.control.value;
    });
    this.disabled = this.disabled || this.control.disabled;
  }

  public onChangeInput(value: string): void {
    this.isValue = !!value.length;
  }

  public onReset(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.isValue = false;
      this.input.nativeElement.value = '';
      this.control.setValue('');
      this.reset.emit();
    }
  }
  private showErrorMessages(inputValueLength: number, maxLength: number | undefined): void {
    if (maxLength && inputValueLength === maxLength) {
      this.showMaxInputMessageError = true;
      this.maxLengthLimit = maxLength;
    } else if (this.control.errors && this.control.errors.maxlength) {
      this.maxLengthLimit = this.control.errors.maxlength.requiredLength;
    } else {
      this.showMaxInputMessageError = false;
    }
  }
}