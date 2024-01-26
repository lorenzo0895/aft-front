import { ChangeDetectorRef, Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { LoadingService } from '@shared/services/loading.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { fadeAnimation } from '@shared/constants/fadeIn.animation';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    MatProgressBarModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent {
  isOpen = signal<boolean>(localStorage.getItem('isOpen') === 'true');

  constructor(
    protected _authService: AuthService,
    protected _loadingService: LoadingService,
  ) {}

  openCloseSidebar() {
    this.isOpen.update((x) => !x);
    localStorage.setItem('isOpen', JSON.stringify(this.isOpen));
  }
}
