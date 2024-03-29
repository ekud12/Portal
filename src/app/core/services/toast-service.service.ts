import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action?: string) {
    this.snackBar.dismiss();
    this.snackBar.open(message, null, {
      duration: 6000,
      verticalPosition: 'top',
      direction: 'rtl',
      panelClass: 'snack-item'
    });
  }
}
