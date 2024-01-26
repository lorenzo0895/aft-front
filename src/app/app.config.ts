import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from '@shared/interceptors/http-error.interceptor';
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { LoadingInterceptor } from '@shared/interceptors/loading.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { ModalModule } from '@shared/components/modal/modal.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      ModalModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token'),
        },
      }),
    )
  ],
};
