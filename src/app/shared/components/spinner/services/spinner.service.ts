import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { SpinnerComponent } from '../spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _overlayRef!: OverlayRef;
  private _subjectRequests: BehaviorSubject<number> = new BehaviorSubject(0);
  private _requests: Observable<number> = this._subjectRequests
    .asObservable()
    .pipe(skip(1));

  constructor(private _overlay: Overlay) {
    this._requests.subscribe((res) => {
      if (res == 0) this.close();
      if (res == 1) this.open();
    });
  }

  incrementRequests(increment: number) {
    this._subjectRequests.next(this._subjectRequests.getValue() + increment);
  }

  open(): void {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      return;
    }
    let config = new OverlayConfig({
      width: '100vw',
      height: '100vh',
      positionStrategy: this._overlay.position().global().left('0').top('0'),
    });
    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  close(): void {
    this._overlayRef?.detach();
  }
}
