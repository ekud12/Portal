import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { app, versionSelector } from './store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ app }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  declarations: []
})
export class CoreModule {}
