import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMatchesCardComponent } from './active-matches-card.component';

describe('ActiveMatchesCardComponent', () => {
  let component: ActiveMatchesCardComponent;
  let fixture: ComponentFixture<ActiveMatchesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveMatchesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMatchesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
