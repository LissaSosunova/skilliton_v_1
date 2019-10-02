import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillToObtainCardComponent } from './skill-to-obtain-card.component';

describe('SkillToObtainCardComponent', () => {
  let component: SkillToObtainCardComponent;
  let fixture: ComponentFixture<SkillToObtainCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillToObtainCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillToObtainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
