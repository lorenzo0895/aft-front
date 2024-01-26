import { Injectable, NgZone, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal<boolean>(false)

  constructor(private ngZone: NgZone) {}

  set(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }
}
