import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private behSub$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.behSub$.asObservable();

  constructor() {}

  set(isLoading: boolean) {
    this.behSub$.next(isLoading);
  }
}
