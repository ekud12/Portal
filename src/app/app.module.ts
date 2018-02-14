import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LayoutModule } from './_layout/layout.module';
import { SharedModule } from './_modules/shared.module';
import { RoutingModule } from './_routing/routing.module';
import { ViewsModule } from './_views/views.module';
import { DashboardModule } from './_dashboard/dashboard.module';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    RoutingModule,
    DashboardModule,
    ViewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
