import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesOfResidenceComponent } from './places-of-residence.component';

describe('PlacesOfResidenceComponent', () => {
  let component: PlacesOfResidenceComponent;
  let fixture: ComponentFixture<PlacesOfResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesOfResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesOfResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
