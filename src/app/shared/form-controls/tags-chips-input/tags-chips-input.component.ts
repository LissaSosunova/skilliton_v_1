import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output } from '@angular/core';
import { InputAbstract, MakeProvider } from '../model/input-abstract';

export interface AutoCompleteModel {
  value: any;
  name: string;
}

@Component({
  selector: 'app-tags-chips-input',
  templateUrl: './tags-chips-input.component.html',
  styleUrls: ['./tags-chips-input.component.scss']
})
export class TagsChipsInputComponent extends InputAbstract implements OnInit {
@Input() tagsSkills: Array<any>;
@Input() items;
public isValue: boolean = false;
@Input() onlyFromAutocomplete?: boolean;
@Input() placeholder?: string;
@Input() secondaryPlaceholder?: string;
@ViewChild('searchInput',  { static: false }) private input: ElementRef;
@Output() selected: any;
@Input('formControlName') name: string;
@Input('ngModel') model: any;


  constructor() { 
    super();
  }

  ngOnInit() {
    super.init();
    super.subscribeFormControl();
    // console.log(this.tagsSkills);
    this.items = this.tagsSkills;
  }

  onTextChange(e){
    console.log(e);
  }
  onAdd(e) {
    console.log(e);
  }


}
