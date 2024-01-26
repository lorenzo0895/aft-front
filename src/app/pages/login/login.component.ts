import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { fields } from './constants/formly';
import { EditedFormlyModule } from '@shared/components/formly/edited-formly.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EditedFormlyModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fields: FormlyFieldConfig[] = fields(this);

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  login(model: any) {
    this._authService.login(model).subscribe(() => {
      this._router.navigate(['..', 'clients']);
    });
  }
}
