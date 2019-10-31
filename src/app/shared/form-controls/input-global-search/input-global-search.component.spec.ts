import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGlobalSearchComponent } from './input-global-search.component';

describe('InputGlobalSearchComponent', () => {
  let component: InputGlobalSearchComponent;
  let fixture: ComponentFixture<InputGlobalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGlobalSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGlobalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
