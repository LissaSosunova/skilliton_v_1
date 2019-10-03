import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [MakeProvider(SelectComponent)]
})

export class SelectComponent extends InputAbstract implements OnInit {
  submitted = false;
  @Input() options: any;
  @Input() label?: any;

  constructor( ) {
    super();
   }

  ngOnInit() {
    super.init();
    super.subscribeFormControl();
  }

  changeSuit(e) {
    // this.oppoSuitsForm.get('name').setValue(e.target.value, {
    //   onlySelf: true
    // })
  }
  private subscribeForShowingErrorMessages(): void {
    const subscription: Subscription = this.control.valueChanges.subscribe(value => {
      value = value || '';
    });
    this.subscriptions.push(subscription);
  }
  onSubmit() {
    this.submitted = true;
  }
}
