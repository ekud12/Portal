import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MdePopoverModule } from '@material-extended/mde';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgUploaderModule } from 'ngx-uploader';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { materialImports } from './material-imports';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { effects, sharedReducer } from './store';
import { InvoiceRowDatePipe } from './utils/invoice-row-date.pipe';
import { InvoiceStatusColorPipe } from './utils/invoice-status-color.pipe';
import { InvoiceStatusPipe } from './utils/invoice-status.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MdePopoverModule,
    RouterModule,
    materialImports,
    NgxChartsModule,
    NgUploaderModule,
    TranslateModule.forChild(),

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
