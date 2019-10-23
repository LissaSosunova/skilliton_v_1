import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsCardComponent } from './interests-card.component';

describe('InterestsCardComponent', () => {
  let component: InterestsCardComponent;
  let fixture: ComponentFixture<InterestsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
