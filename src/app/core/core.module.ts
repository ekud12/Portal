import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { app, versionSelector, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from 'selenium-webdriver/http';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ app }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot(effects)
  ],
  declarations: [],
  providers: [BackendService]
})
export class CoreModule {}
