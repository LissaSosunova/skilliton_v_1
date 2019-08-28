import { Component, OnInit } from '@angular/core';
import { types } from '../../types/types';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {

  public values: Array<types.Langs> = [];

  constructor() { }

  ngOnInit() {
  const langs = [{ id: 1, name: "en" },
                { id: 2, name: "ru" },
                { id: 3, name: "ua" }];

    this.values = langs;
  }

  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
  }

}
