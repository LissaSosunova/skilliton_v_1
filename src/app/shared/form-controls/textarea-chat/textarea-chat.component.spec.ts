import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaChatComponent } from './textarea-chat.component';

describe('TextareaChatComponent', () => {
  let component: TextareaChatComponent;
  let fixture: ComponentFixture<TextareaChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
