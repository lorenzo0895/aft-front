import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() menuClick: EventEmitter<void> = new EventEmitter();
  isLogged$!: Observable<boolean>;
  user$!: Observable<any>;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged$ = this._authService.isLogged$;
    this.user$ = this._authService.user$;
  }
  onMenuClick() {
    this.menuClick.emit();
  }
  logout() {
    this._authService.logout();
  }
}
