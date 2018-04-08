import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CustomDatepickerComponent } from './custom-datepicker.component';
import { MonthPickerComponent } from './month-picker-component/month-picker.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatNativeDateModule
  ],
  declarations: [CustomDatepickerComponent, MonthPickerComponent],
  exports: [CustomDatepickerComponent]
})
export class CustomDatepickerModule {}
