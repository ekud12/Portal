import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { rootRoutes } from './routes';
import { UserModule } from './features/user/user.module';
import { CoreModule } from './core/core.module';
import { BackendService } from './core/services/backend.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    RouterModule.forRoot(rootRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
