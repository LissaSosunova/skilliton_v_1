import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwProfileComponent } from './veiw-profile.component';

describe('VeiwProfileComponent', () => {
  let component: VeiwProfileComponent;
  let fixture: ComponentFixture<VeiwProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
