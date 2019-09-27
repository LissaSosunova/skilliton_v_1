import { Component, OnInit, Input } from '@angular/core';
import { weekDays } from '../../../shared/constants/week-days';

@Component({
  selector: 'app-week-days',
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.scss']
})
export class WeekDaysComponent implements OnInit {
  public options: any = weekDays;

  selected: boolean = false;

  @Input() label?: string;
  constructor() { }

  ngOnInit() {
    
  }
  setValue (value: string) {

  }
}
