import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
import { Subscription,
  Observable } from 'rxjs';
import { types } from '../../../types/types';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [MakeProvider(InputTextComponent)]
})

export class InputTextComponent extends InputAbstract implements OnInit {

// max text length for limiting text entering in HTML
@Input() public maxLength?: number = 524288; // default value
// min text length
@Input() public minLength?: number;
@Input() public autocomplete?: boolean = false;
public showMaxInputMessageError: boolean = false;
public maxLengthLimit: number;
public showContent: boolean = false;
public placeholder?: string;
@Input() label?: string;
public value?: string;

constructor() {
  super();
}

ngOnInit() {
  if (this.maxLength) {
    this.validatorsConfig.push(Validators.maxLength(this.maxLength));
  }
  if (this.minLength) {
    this.validatorsConfig.push(Validators.minLength(this.minLength));
  }
  super.init();
  super.subscribeFormControl();
  this.subscribeForShowingErrorMessages();
}

public get minLengthError(): string {
  return `Minimun ${this.control.errors.minlength.requiredLength} characters`;
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

private subscribeForShowingErrorMessages(): void {
  const subscription: Subscription = this.control.valueChanges.subscribe(value => {
    value = value || '';
    const inputValueLength: number = value.length;
    this.showErrorMessages(inputValueLength, this.maxLength);
  });
  this.subscriptions.push(subscription);
}

}
