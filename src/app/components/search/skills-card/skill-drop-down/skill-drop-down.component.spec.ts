import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDropDownComponent } from './skill-drop-down.component';

describe('SkillDropDownComponent', () => {
  let component: SkillDropDownComponent;
  let fixture: ComponentFixture<SkillDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
