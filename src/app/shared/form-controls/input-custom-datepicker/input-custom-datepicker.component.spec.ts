import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCustomDatepickerComponent } from './input-custom-datepicker.component';

describe('InputCustomDatepickerComponent', () => {
  let component: InputCustomDatepickerComponent;
  let fixture: ComponentFixture<InputCustomDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCustomDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCustomDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
