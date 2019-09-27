import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsToOtainComponent } from './skills-to-otain.component';

describe('SkillsToOtainComponent', () => {
  let component: SkillsToOtainComponent;
  let fixture: ComponentFixture<SkillsToOtainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsToOtainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsToOtainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
