import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StsViewComponent } from './sts-view.component';

describe('StsViewComponent', () => {
  let component: StsViewComponent;
  let fixture: ComponentFixture<StsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
