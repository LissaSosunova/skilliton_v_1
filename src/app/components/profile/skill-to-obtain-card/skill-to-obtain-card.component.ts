import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-to-obtain-card',
  templateUrl: './skill-to-obtain-card.component.html',
  styleUrls: ['./skill-to-obtain-card.component.scss']
})
export class SkillToObtainCardComponent implements OnInit {
  public enableSkill: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
