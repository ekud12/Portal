import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { environment } from '@environment';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';

import { ErrorHandler } from './http/error-handler.interceptor';
import { HttpParamsInterceptor } from './http/httpParamsInterceptor';
import { AuthenticationService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';
import { ToastService } from './services/toast-service.service';
import { CustomSerializer, effects, getInitialState, metaReducers, reducers } from './store';

export function configServiceFactory(config: ConfigService) {
  return () => config.load();
}
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot(reducers, {
      initialState: getInitialState(),
      metaReducers
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 10
        })
      : [],
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule
  ],
  declarations: [],
  providers: [
    BackendService,
    ToastService,
    LoggerService,
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpParamsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandler,
      multi: true
    },
    ConfigService
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
