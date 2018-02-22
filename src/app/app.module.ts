import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DndModule } from 'ng2-dnd';
import { SharedModule } from './shared/shared.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { rootRoutes } from './routes';
import { UserModule } from './features/user/user.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    RouterModule.forRoot(rootRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
