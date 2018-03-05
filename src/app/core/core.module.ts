import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { reducers, versionSelector, effects, CustomSerializer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from 'selenium-webdriver/http';
import { BackendService } from './services/backend.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { rxjs_imports } from './rxjs-imports';
import { ErrorHandler } from './http/error-handler.interceptor';
import { httpParamsInterceptor } from './http/url-encoder.interceptor';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule
  ],
  declarations: [],
  providers: [
    BackendService,
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpParamsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandler,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
