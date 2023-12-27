import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { PrintReceiptComponent } from '@pages/print-receipt/print-receipt.component';
import { ReceiptDetailsComponent } from '@pages/receipt-details/receipt-details.component';
import { jwtGuard } from '@shared/guards/jwt.guard';
import { ClientsComponent } from './pages/clients/clients.component';
import { DatesComponent } from './pages/dates/dates.component';
import { OtherMoneyTransactionsComponent } from './pages/other-money-transactions/other-money-transactions.component';
import { ReceiptsItemsComponent } from './pages/receipts-items/receipts-items.component';
import { ReceiptsComponent } from './pages/receipts/receipts.component';
import { UsersComponent } from './pages/users/users.component';
import { UtilsComponent } from '@pages/utils/utils.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Spallione | Login',
  },
  {
    path: 'clients',
    component: ClientsComponent,
    title: 'Spallione | Clientes',
    canActivate: [jwtGuard],
  },
  {
    path: 'dates',
    component: DatesComponent,
    title: 'Spallione | Fechas',
    canActivate: [jwtGuard],
  },
  {
    path: 'items',
    component: ReceiptsItemsComponent,
    title: 'Spallione | Netos',
    canActivate: [jwtGuard],
  },
  {
    path: 'receipts/:id/print',
    component: PrintReceiptComponent,
    title: 'Spallione | Comprobantes',
    canActivate: [jwtGuard],
  },
  {
    path: 'receipts/:id',
    component: ReceiptDetailsComponent,
    title: 'Spallione | Netos',
    canActivate: [jwtGuard],
  },
  {
    path: 'receipts',
    component: ReceiptsComponent,
    title: 'Spallione | Comprobantes',
    canActivate: [jwtGuard],
  },
  // {
  //   path: 'other',
  //   component: OtherMoneyTransactionsComponent,
  //   title: 'Spallione | Otros Movimientos',
  //   canActivate: [jwtGuard],
  // },
  {
    path: 'utils',
    component: UtilsComponent,
    title: 'Spallione | Reportes',
    canActivate: [jwtGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Spallione | Usuarios',
    canActivate: [jwtGuard],
  },
  { path: '**', redirectTo: 'clients' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
