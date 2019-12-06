import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedPersonsComponent } from './interested-persons.component';

describe('InterestedPersonsComponent', () => {
  let component: InterestedPersonsComponent;
  let fixture: ComponentFixture<InterestedPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
