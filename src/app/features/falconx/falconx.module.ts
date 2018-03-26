import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadNewInvoiceComponent } from './components/upload-new-invoice/upload-new-invoice.component';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { falconxRoutes } from './routes';

const ACTION_COMPONENTS = [UploadNewInvoiceComponent, InvoicesTableComponent];
@NgModule({
  imports: [CommonModule, SharedModule, UserModule, FormsModule, RouterModule.forChild(falconxRoutes)],
  declarations: ACTION_COMPONENTS,
  exports: ACTION_COMPONENTS
})
export class FalconxModule {}
