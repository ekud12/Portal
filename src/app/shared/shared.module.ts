import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatPaginatorIntl } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MdePopoverModule } from '@material-extended/mde';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgUploaderModule } from 'ngx-uploader';
import { BackendService } from '../core/services/backend.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CustomMatPaginatorIntl } from './global-models/material-custom-impl.class';
import { materialImports } from './material-imports';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { effects, sharedReducer } from './store';
import { As400DatePipe } from './utils/as400-date.pipe';
import { DatetimePipe } from './utils/datetime.pipe';
import { FileSizePipe } from './utils/file-size.pipe';
import { InvoiceRowDatePipe } from './utils/invoice-row-date.pipe';
import { InvoiceStatusColorPipe } from './utils/invoice-status-color.pipe';
import { InvoiceStatusPipe } from './utils/invoice-status.pipe';
import { ValidityCheckerPipe } from './utils/validity-checker.pipe';

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
    FileUploadComponent,
    As400DatePipe,
    DatetimePipe,
    FileSizePipe,
    ValidityCheckerPipe
  ],
  entryComponents: [AlertDialogComponent, FileUploadComponent],
  providers: [
    BackendService,
    { provide: MAT_DIALOG_DATA, useValue: [] },
    DatePipe,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
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
    DatetimePipe,
    ValidityCheckerPipe,
    FileUploadComponent
  ]
})
export class SharedModule {}
