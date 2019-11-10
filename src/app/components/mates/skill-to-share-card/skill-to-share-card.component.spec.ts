import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateSkillToShareCardComponent } from './skill-to-share-card.component';

describe('SkillToShareCardComponent', () => {
  let component: MateSkillToShareCardComponent;
  let fixture: ComponentFixture<MateSkillToShareCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateSkillToShareCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateSkillToShareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
