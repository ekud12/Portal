import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { TranslateModule } from '@ngx-translate/core';

import { reducers, effects, CustomSerializer, getInitialState, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { BackendService } from './services/backend.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { rxjs_imports } from './rxjs-imports';
import { ErrorHandler } from './http/error-handler.interceptor';
import { HttpParamsInterceptor } from './http/httpParamsInterceptor';
import { ToastService } from './services/toast-service.service';
import { AuthenticationService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { environment } from '@environment';
import { LoggerService } from './services/logger.service';

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
