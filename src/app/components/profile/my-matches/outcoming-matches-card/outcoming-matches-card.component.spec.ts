import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomingMatchesCardComponent } from './outcoming-matches-card.component';

describe('OutcomingMatchesCardComponent', () => {
  let component: OutcomingMatchesCardComponent;
  let fixture: ComponentFixture<OutcomingMatchesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcomingMatchesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomingMatchesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
