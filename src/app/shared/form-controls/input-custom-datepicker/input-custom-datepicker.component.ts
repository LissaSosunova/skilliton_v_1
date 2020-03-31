import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-input-custom-datepicker',
  templateUrl: './input-custom-datepicker.component.html',
  styleUrls: ['./input-custom-datepicker.component.scss']
})
export class InputCustomDatepickerComponent implements OnInit {
  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
    // other options...
  };

  private myForm: FormGroup;
  @Input() public control?: FormControl;
  @Output() public dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize to today date
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    this.myForm = this.formBuilder.group({
      myDate: [model, Validators.required]
      // other controls are here...
    });
  }

  setDate(): void {
    // Set today date using the patchValue function
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    this.myForm.patchValue({myDate: model});
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
  }
}