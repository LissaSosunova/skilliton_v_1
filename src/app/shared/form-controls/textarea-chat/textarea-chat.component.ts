import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { OnInit,
  forwardRef,
  Component,
  NgZone,
  ViewChild,
  SimpleChanges,
  ElementRef,
  Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { InputAbstract, MakeProvider } from '../model/input-abstract';
import {take} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/** @title Auto-resizing textarea */

@Component({
  selector: 'app-textarea-chat',
  templateUrl: './textarea-chat.component.html',
  styleUrls: ['./textarea-chat.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaChatComponent),
    multi: true
  }]
})
export class TextareaChatComponent extends InputAbstract implements OnInit, OnChanges, ControlValueAccessor {

  @Output() public reset: EventEmitter<void> = new EventEmitter<void>();
  public isValue = false;
  @Input() public maxLength = 500; // default value
  @Input() public text: string;
  private inputElement: HTMLInputElement;

  @ViewChild('input', {static: true}) public input: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(private _ngZone: NgZone) {
    super();
  }

  ngOnInit() {
    this.inputElement = this.input.nativeElement as HTMLInputElement;
    super.init();
    super.subscribeFormControl();
    if (this.text !== '') {
      this.control.setValue(this.text);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.text && !changes.text.isFirstChange()) {
      setTimeout(() => {
        this.text = this.input.nativeElement.innerHTML;
        this.control.setValue(this.text);
      });
    }
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
