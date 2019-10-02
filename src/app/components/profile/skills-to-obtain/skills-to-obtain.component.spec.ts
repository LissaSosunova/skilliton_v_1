import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsToObtainComponent } from './skills-to-obtain.component';

describe('SkillsToOtainComponent', () => {
  let component: SkillsToObtainComponent;
  let fixture: ComponentFixture<SkillsToObtainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsToObtainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsToObtainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
