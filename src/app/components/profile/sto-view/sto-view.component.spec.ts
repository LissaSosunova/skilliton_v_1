import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoViewComponent } from './sto-view.component';

describe('StoViewComponent', () => {
  let component: StoViewComponent;
  let fixture: ComponentFixture<StoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
