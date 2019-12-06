import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomedationsCardComponent } from './recomedations-card.component';

describe('RecomedationsCardComponent', () => {
  let component: RecomedationsCardComponent;
  let fixture: ComponentFixture<RecomedationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomedationsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomedationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
