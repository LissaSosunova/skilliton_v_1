import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePopupComponent } from './leave-popup.component';

describe('LeavePopupComponent', () => {
  let component: LeavePopupComponent;
  let fixture: ComponentFixture<LeavePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
