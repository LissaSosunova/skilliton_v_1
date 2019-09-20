// import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnChanges, Input } from '@angular/core';
// import { InputAbstract, MakeProvider } from '../model/input-abstract';
// import * as _ from 'lodash';

// @Component({
//   selector: 'app-input-search',
//   templateUrl: './input-search.component.html',
//   styleUrls: ['./input-search.component.scss'],
//   providers: [MakeProvider(InputSearchComponent)]
// })

// export class InputSearchComponent extends InputAbstract implements OnInit, OnChanges {

//   @Output() public reset: EventEmitter<void> = new EventEmitter<void>();
//   @Input() public options?: any;
//   @Output() value: string;
  

//   public isValue: boolean = false;
//   public openAuto: boolean = false;

//   @ViewChild('searchInput',  { static: false }) private input: ElementRef;

//   constructor() {
//     super();
//    }

//   ngOnChanges() {
//     if (typeof this.value === 'string' && this.value.length > 0) {
//       this.isValue = true;
//     } else {
//       this.isValue = false;
//     }
//   }

//   ngOnInit() {
//     super.init();
//     super.subscribeFormControl();
//     setTimeout(() => {
//       this.isValue = !!this.control.value;
//     });
//     this.disabled = this.disabled || this.control.disabled;

//   }

//   public onChangeInput(value: string): void {
//     let arr =[];
//     const newOptions = _.filter(this.options, o => arr.push({name: _.lowerCase(o.name), value: o.value}));
//     if(this.options.length > 1 && this.options !== undefined) {
//       const result = _.filter(arr, o => _.includes(o.name, value));
//       console.log(result);
//       this.options = result;
//     }
//     this.openAuto = true;
//   }


//   public onSearch(value: string): void {
//     event.stopPropagation();
//     console.log(value);
//   }
  
//   public setValueFromDropDown(option) {
//     this.openAuto = false;
//     console.log(option, this.input);
//     this.disabled = this.disabled || this.control.disabled;
//     this.value = option.name;
//     this.input.nativeElement.value = option.name;
//     this.onChangeInput(this.input.nativeElement.value);
//   }

//   public onReset(event: MouseEvent): void {
//     event.stopPropagation();
//     if (!this.disabled) {
//       this.isValue = false;
//       this.input.nativeElement.value = '';
//       this.control.setValue('');
//       this.reset.emit();
//     }
//   }
// }

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { InputAbstract, MakeProvider } from '../model/input-abstract';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  providers: [MakeProvider(InputSearchComponent)]
})

export class InputSearchComponent extends InputAbstract implements OnInit, OnChanges {

  @Output() public reset: EventEmitter<void> = new EventEmitter<void>();

  public isValue: boolean = false;

  @ViewChild('searchInput',  { static: false }) private input: ElementRef;

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
    // setTimeout(() => {
    //   this.isValue = !!this.control.value;
    // });
    this.isValue = !!this.control.value;
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

}
