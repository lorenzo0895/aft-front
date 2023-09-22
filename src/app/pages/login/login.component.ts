import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { AuthService } from '@shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fields } from './constants/formly';
import { finalize } from 'rxjs';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormlyModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fields: FormlyFieldConfig[] = fields(this);

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._authService.isLogged$.subscribe((isLogged) => {
      if (isLogged)
        this._router.navigate(['..', 'clients'], {
          relativeTo: this._activatedRoute,
        });
    });
  }

  login(model: any) {
    this._authService.login(model).subscribe(() => {
      this._router.navigate(['..', 'clients']);
    });
  }
}
