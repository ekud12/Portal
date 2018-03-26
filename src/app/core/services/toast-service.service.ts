import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      direction: 'rtl',
      panelClass: 'snack-item'
    });
  }
}
