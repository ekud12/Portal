import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { materialImports } from './material-imports';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MdePopoverModule } from '@material-extended/mde';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './store';
import { sharedReducer } from './store';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { InvoiceStatusPipe } from './utils/invoice-status.pipe';
import { InvoiceStatusColorPipe } from './utils/invoice-status-color.pipe';
import { InvoiceRowDatePipe } from './utils/invoice-row-date.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MdePopoverModule,
    RouterModule,
    materialImports,
    NgxChartsModule,
       StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    PageNotFoundComponent,
    PrintLayoutComponent,
    AlertDialogComponent,
    InvoiceStatusPipe,
    InvoiceStatusColorPipe,
    InvoiceRowDatePipe,
    FileUploadComponent
  ],
  entryComponents: [AlertDialogComponent, FileUploadComponent],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: [] }, DatePipe],
  exports: [
    materialImports,
    FlexLayoutModule,
    ReactiveFormsModule,
    PageNotFoundComponent,
    PrintLayoutComponent,
    AlertDialogComponent,
    InvoiceStatusPipe,
    InvoiceStatusColorPipe,
    InvoiceRowDatePipe,
    FileUploadComponent
  ]
})
export class SharedModule {}
