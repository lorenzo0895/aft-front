import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UxService {
  isMobile$ = new BehaviorSubject(window.innerWidth <= 700);

  constructor() {
    const query = matchMedia('(max-width: 700px)');
    fromEvent(query, 'change').subscribe((event: any) => {
      this.isMobile$.next(event.matches);
    })
  }
}
