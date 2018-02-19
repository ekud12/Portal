import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../_modules/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

const LAYOUT_COMPONENTS = [HeaderComponent, FooterComponent];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: LAYOUT_COMPONENTS,
  exports: LAYOUT_COMPONENTS
})
export class LayoutModule {}
