import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
  exportAs: 'appDragDrop'
})
export class DragDropDirective {
  private _counter = 0;
  get isOver() { return this._counter > 0; };

  @HostListener ('drop', ['$event']) private _drop(event: DragEvent) {
    event.preventDefault();
    this._counter = 0;
  }
  @HostListener ('dragover', ['$event']) private _dragover(event: DragEvent) {
    event.preventDefault();
  }
  @HostListener ('dragenter', ['$event']) private _dragenter(event: DragEvent) {
    event.preventDefault();
    this._counter++;
  }
  @HostListener ('dragleave', ['$event']) private _dragleave(event: DragEvent) {
    this._counter--;
  }
  @HostBinding('class.over') get isOverClass() { return this.isOver };
}
