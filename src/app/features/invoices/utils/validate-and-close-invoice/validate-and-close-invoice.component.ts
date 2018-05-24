import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fadeAnimation } from 'app/core/animations';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../../models/class-models/objects.model';
import { InvoiceRowDatePipe } from '../../../../shared/utils/invoice-row-date.pipe';
@Component({
  selector: 'app-validate-and-close-invoice',
  templateUrl: './validate-and-close-invoice.component.html',
  styleUrls: ['./validate-and-close-invoice.component.css'],
  animations: [fadeAnimation]
})
export class ValidateAndCloseInvoiceComponent implements OnInit {
  closeInvoiceApprove = false;
  closeInvoiceVerified = false;
  closeInvoiceSuccess = false;
  processStage = 'approval';
  verificationObject = {
    hp: '',
    billMonth: '',
    billSum: ''
  };
  userSapDetails$: Observable<any>;
  activeInvoiceToClose$: Observable<Invoice>;
  constructor(
    public dialogRef: MatDialogRef<ValidateAndCloseInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private userStore: Store<fromUserStore.UserState>,
    private AS400DatePipe: InvoiceRowDatePipe
  ) {
    this.activeInvoiceToClose$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  approveClosing() {
    this.processStage = 'verification';
  }

  isValid() {
    this.activeInvoiceToClose$.take(1).subscribe(val => {
      if (
        this.AS400DatePipe.transform(val.billMonthField, 'billMonthField') === this.verificationObject.billMonth &&
        val.typedSumField === this.verificationObject.billSum
      ) {
        this.closeInvoiceVerified = true;
      } else {
        this.closeInvoiceVerified = false;
      }
    });
  }

  closeInvoice() {
    this.processStage = 'checking';
    // this.closeInvoiceVerified = true;
    setTimeout(() => (this.processStage = 'error'), 3000);
  }
}
