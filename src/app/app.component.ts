import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@shared/constants/fadeIn.animation';
import { AuthService } from '@shared/services/auth.service';
import { LoadingService } from '@shared/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'my-app-front';
  isOpen: boolean = false;
  isLogged$!: Observable<boolean>;
  isLoading: boolean = false;
  state: 'void' | '*' = 'void';

  constructor(
    private _authService: AuthService,
    protected _loadingService: LoadingService,
    private _cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.isLogged$ = this._authService.isLogged$;
    this._loadingService.isLoading$.subscribe((res) => {
      this.isLoading = res;
      this._cd.detectChanges();
    });
  }
}
