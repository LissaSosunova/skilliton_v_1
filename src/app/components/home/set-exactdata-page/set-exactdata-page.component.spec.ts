import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetExactdataPageComponent } from './set-exactdata-page.component';

describe('SetExactdataPageComponent', () => {
  let component: SetExactdataPageComponent;
  let fixture: ComponentFixture<SetExactdataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetExactdataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetExactdataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
