import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, signal } from '@angular/core';
import { tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string = environment.apiUrl + '/auth';
  roles$ = signal<string[]>([]);
  isLogged = signal<boolean>(true);
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _jwt: JwtHelperService,
  ) {
    this.updateObservables();
    effect(() => {
      if (!this.isLogged()) this._router.navigate(['login']);
    });
  }

  login(model: any) {
    return this._http
      .post(this._url + '/login', {
        username: model.username,
        password: model.password,
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.updateObservables();
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.updateObservables()
  }

  updateObservables() {
    this.user$.next(this._getUser());
    this.roles$.set(this._getRoles());
    this.isLogged.set(this._isLogged());
  }

  hasRole(role: string) {
    return this.roles$().includes(role);
  }

  hasRoleSignal(role: string) {
    return computed(() => this.roles$().includes(role));
  }

  private _getParsedToken() {
    try {
      const token = <string>this._jwt.tokenGetter();
      return token ? this._jwt.decodeToken(token) : null;
    } catch (error) {
      return null;
    }
  }

  private _getRoles() {
    return this._getParsedToken()?.roles ?? [];
  }

  private _getUser() {
    try {
      const parsedToken = this._getParsedToken();
      return parsedToken;
    } catch (error) {
      return null;
    }
  }

  private _isLogged() {
    try {
      const token = <string>this._jwt.tokenGetter();
      const expired = this._jwt.isTokenExpired(token);
      return !!token && !expired;
    } catch (error) {
      return false;
    }
  }
}
