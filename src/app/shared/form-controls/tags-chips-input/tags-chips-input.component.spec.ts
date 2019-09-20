import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsChipsInputComponent } from './tags-chips-input.component';

describe('TagsChipsInputComponent', () => {
  let component: TagsChipsInputComponent;
  let fixture: ComponentFixture<TagsChipsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsChipsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsChipsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
