import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-i-last-invoice-total-widget',
  templateUrl: './i-last-invoice-total-widget.component.html',
  styleUrls: ['./i-last-invoice-total-widget.component.css']
})
export class ILastInvoiceTotalWidgetComponent implements OnInit {
  single = [
    {
      name: 'סה"כ חיוב',
      value: 8900
    }
  ];
  multi: any[];
  bandColor = '#a8385d';
  view: any[] = [160, 170];

  colorScheme = {
    domain: ['#000']
  };

  constructor() {}

  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {}
}
