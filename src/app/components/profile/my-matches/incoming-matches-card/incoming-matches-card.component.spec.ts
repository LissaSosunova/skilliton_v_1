import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingMatchesCardComponent } from './incoming-matches-card.component';

describe('IncomingMatchesCardComponent', () => {
  let component: IncomingMatchesCardComponent;
  let fixture: ComponentFixture<IncomingMatchesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingMatchesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingMatchesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
