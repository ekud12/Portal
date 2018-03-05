import { NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { rxjs_imports } from './rxjs-imports';
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
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class CoreModule {}
