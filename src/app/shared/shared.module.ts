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
  declarations: [PageNotFoundComponent],
  exports: [materialImports, FlexLayoutModule, ReactiveFormsModule, PageNotFoundComponent, CustomDatepickerModule]
})
export class SharedModule {}
