import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDefaultChipsComponent } from './mat-default-chips.component';

describe('MatDefaultChipsComponent', () => {
  let component: MatDefaultChipsComponent;
  let fixture: ComponentFixture<MatDefaultChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDefaultChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDefaultChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
