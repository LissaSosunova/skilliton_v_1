import {Directive, HostListener, ElementRef, AfterViewInit} from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 *  Works only with reactive forms or two-way binding
 */
@Directive({
  selector: 'input[appInputTrim], textarea[appInputTrim]',
})
export class InputTrimDirective implements AfterViewInit  {

  private input: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private controlRef: NgControl
  ) {}

  ngAfterViewInit() {
    this.input = this.elementRef.nativeElement;
  }

  @HostListener('change', [])
  public onChange() {
    const trim = this.input.value.trim();
    this.tryApply(trim);
  }

  @HostListener('input', [])
  public onInput() {
    const trim = this.input.value.replace(/^\s+/, '');
    this.tryApply(trim);
  }

  public tryApply(trimmed: string) {
    if (trimmed !== this.input.value) {
      this.controlRef.control.patchValue(trimmed);
    }
  }
}
