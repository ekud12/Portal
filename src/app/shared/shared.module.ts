import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { materialImports } from './material-imports';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MdePopoverModule } from '@material-extended/mde';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CustomDatepickerModule } from './utils/custom-datepicker/custom-datepicker.module';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MdePopoverModule,
    RouterModule,
    materialImports,
    NgxChartsModule
  ],
  declarations: [PageNotFoundComponent, PrintLayoutComponent],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: [] }],
  exports: [
    materialImports,
    FlexLayoutModule,
    ReactiveFormsModule,
    PageNotFoundComponent,
    CustomDatepickerModule,
    PrintLayoutComponent
  ]
})
export class SharedModule {}
