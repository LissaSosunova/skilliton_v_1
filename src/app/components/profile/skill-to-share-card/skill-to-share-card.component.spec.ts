import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillToShareCardComponent } from './skill-to-share-card.component';

describe('SkillToShareCardComponent', () => {
  let component: SkillToShareCardComponent;
  let fixture: ComponentFixture<SkillToShareCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillToShareCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillToShareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
