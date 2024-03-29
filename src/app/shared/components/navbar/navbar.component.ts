import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';
import { UxService } from '@shared/services/ux.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() menuClick: EventEmitter<void> = new EventEmitter();
  isLogged = this._authService.isLogged;
  user$!: Observable<any>;

  constructor(
    protected _uxService: UxService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user$ = this._authService.user$;
  }
  onMenuClick() {
    this.menuClick.emit();
  }
  logout() {
    this._authService.logout();
  }
}
