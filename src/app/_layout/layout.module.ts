import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../_modules/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

const comps = [HeaderComponent];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class LayoutModule {}
