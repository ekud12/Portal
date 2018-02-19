import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from './_modules/shared.module';
import { RoutingModule } from './_routing/routing.module';
import { DashboardModule } from './_dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { UserModule } from './_user/user.module';
import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutingModule,
    DashboardModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
