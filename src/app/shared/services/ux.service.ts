import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UxService {
  isMobile$ = new BehaviorSubject(window.innerWidth <= 500);

  constructor() {
    const query = matchMedia('(max-width: 500px)');
    fromEvent(query, 'change').subscribe((event: any) => {
      this.isMobile$.next(event.matches);
    })
  }
}
