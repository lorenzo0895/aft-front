import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    '[style.display]': '"inline-block"',
    '[style.height]': '"100%"',
  },
})
export class SidebarComponent implements OnInit {
  @Input() open: boolean = true;
  @Input() items: any[] = [
    { icon: 'group', label: 'Clientes', route: 'clients' },
    { icon: 'calendar_month', label: 'Fechas', route: 'dates' },
    { icon: 'receipt_long', label: 'Comprobantes de Caja', route: 'receipts' },
    { icon: 'checklist', label: 'Netos', route: 'items' },
    { icon: 'article', label: 'Útiles', route: 'utils' },
    // { icon: 'sync_alt', label: 'Otros Movimientos', route: 'other' },
    { icon: 'group', label: 'Usuarios', route: 'users' },
  ];
  constructor(private _router: Router) {}

  ngOnInit(): void {}

}
