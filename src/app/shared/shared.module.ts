import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent, FooterComponent } from './layout';
import { materialImports } from './material-imports';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    materialImports,
  ],
  declarations: [PageNotFoundComponent, HeaderComponent, FooterComponent],
  exports: [
    materialImports,
    FlexLayoutModule,
    ReactiveFormsModule,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {}
