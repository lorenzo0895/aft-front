import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @ViewChildren('element') elements!: QueryList<ElementRef<HTMLDivElement>>;
  @Input() open: boolean = true;
  private _items: any[] = [
    { icon: 'group', label: 'Clientes', route: 'clients' },
    { icon: 'calendar_month', label: 'Fechas', route: 'dates' },
    { icon: 'receipt_long', label: 'Comprobantes de Caja', route: 'receipts' },
    { icon: 'checklist', label: 'Netos', route: 'items' },
    { icon: 'article', label: 'Útiles', route: 'utils' },
    // { icon: 'sync_alt', label: 'Otros Movimientos', route: 'other' },
    { icon: 'group', label: 'Usuarios', route: 'users' },
    { icon: 'account_balance', label: 'Facturación', route: 'billing', role: 'getBilling' },
  ];
  items: any[] = [];

  constructor(
    protected _authService: AuthService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.items = this._items.filter(item => {
      return !item.role || this._authService.hasRole(item.role);
    })
  }

  redirect(route: string) {
    this._router.navigateByUrl(route);
  }

  onFocus(event: Event, index: number) {
    event.preventDefault();
    const a = this.elements.get(index);
    if (!a) return;
    a.nativeElement.focus();
  }

}
