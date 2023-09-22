import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { SpinnerService } from '@shared/components/spinner/services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string = environment.apiUrl + '/auth';
  roles$ = new BehaviorSubject([] as string[]);
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _jwt: JwtHelperService,
  ) {
    this.roles$.next(this._getRoles());
    this.isLogged$.next(this._isLogged());
    this.user$.next(this._getUser());
    this.isLogged$.subscribe((isLogged) => {
      if (!isLogged) this._router.navigate(['login']);
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
          this.roles$.next(this._getRoles());
          this.isLogged$.next(true);
          this.user$.next(this._getUser());
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged$.next(false);
    this.roles$.next([]);
    this._router.navigate(['login']);
  }

  updateObservables() {
    this.user$.next(this._getUser());
    this.roles$.next(this._getRoles());
    this.isLogged$.next(this._isLogged());
  }

  hasRole(role: string) {
    return this.roles$.value.includes(role);
  }

  private _getParsedToken() {
    const token = <string>this._jwt.tokenGetter();
    return token ? this._jwt.decodeToken(token) : null;
  }

  private _getRoles() {
    return this._getParsedToken()?.roles ?? [];
  }

  private _getUser() {
    const parsedToken = this._getParsedToken();
    return parsedToken;
  }

  private _isLogged() {
    const token = <string>this._jwt.tokenGetter();
    const expired = this._jwt.isTokenExpired(token);
    return token != null && !expired;
  }
}
