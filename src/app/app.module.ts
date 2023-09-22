import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DatesComponent } from './pages/dates/dates.component';
import { ReceiptsComponent } from './pages/receipts/receipts.component';
import { ReceiptsItemsComponent } from './pages/receipts-items/receipts-items.component';
import { UsersComponent } from './pages/users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from './shared/components/modal/modal.module';
import { EditedFormlyModule } from '@shared/components/formly/edited-formly.module';
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorInterceptor } from '@shared/interceptors/http-error.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingInterceptor } from '@shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SidebarComponent,
    NavbarComponent,
    ModalModule,
    ClientsComponent,
    DatesComponent,
    ReceiptsComponent,
    ReceiptsItemsComponent,
    UsersComponent,
    HttpClientModule,
    EditedFormlyModule,
    ToastModule,
    SpinnerModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
