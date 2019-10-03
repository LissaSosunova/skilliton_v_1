import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillToShareComponent } from './skill-to-share.component';

describe('SkillToShareComponent', () => {
  let component: SkillToShareComponent;
  let fixture: ComponentFixture<SkillToShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillToShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillToShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
