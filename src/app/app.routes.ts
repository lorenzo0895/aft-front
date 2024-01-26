import { Routes } from '@angular/router';
import { loggedGuard, notLoggedGuard } from '@shared/guards/logged.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Spallione | Login',
    canActivate: [notLoggedGuard],
  },
  {
    path: 'clients',
    loadComponent: () => import('./pages/clients/clients.component').then(m => m.ClientsComponent),
    title: 'Spallione | Clientes',
    canActivate: [loggedGuard],
  },
  {
    path: 'dates',
    loadComponent: () => import('./pages/dates/dates.component').then(m => m.DatesComponent),
    title: 'Spallione | Fechas',
    canActivate: [loggedGuard],
  },
  {
    path: 'items',
    loadComponent: () => import('./pages/receipts-items/receipts-items.component').then(m => m.ReceiptsItemsComponent),
    title: 'Spallione | Netos',
    canActivate: [loggedGuard],
  },
  {
    path: 'receipts/:id/print',
    loadComponent: () => import('./pages/print-receipt/print-receipt.component').then(m => m.PrintReceiptComponent),
    title: 'Spallione | Comprobantes',
    canActivate: [loggedGuard],
  },
  {
    path: 'receipts/:id',
    loadComponent: () => import('./pages/receipt-details/receipt-details.component').then(m => m.ReceiptDetailsComponent),
    title: 'Spallione | Netos',
    canActivate: [loggedGuard],
  },
  {
    path: 'receipts',
    loadComponent: () => import('./pages/receipts/receipts.component').then(m => m.ReceiptsComponent),
    title: 'Spallione | Comprobantes',
    canActivate: [loggedGuard],
  },
  {
    path: 'utils',
    loadComponent: () => import('./pages/utils/utils.component').then(m => m.UtilsComponent),
    title: 'Spallione | Reportes',
    canActivate: [loggedGuard],
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
    title: 'Spallione | Usuarios',
    canActivate: [loggedGuard],
  },
  {
    path: 'billing',
    loadComponent: () => import('./pages/billing/billing.component').then(m => m.BillingComponent),
    title: 'Spallione | Facturación',
    canActivate: [loggedGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
