import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './features/user/user.module';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { rootRoutes } from './routes';
import { SharedModule } from './shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxChartsModule,
    UserModule,
    RouterModule.forRoot(rootRoutes)
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
