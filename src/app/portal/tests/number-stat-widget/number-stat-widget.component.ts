import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-number-stat-widget',
  templateUrl: './number-stat-widget.component.html',
  styleUrls: ['./number-stat-widget.component.css']
})
export class NumberStatWidgetComponent implements OnInit {
  @Input() num: number;
  @Input() ododesc: string;
  @Input() borderColor: string;

  constructor() {}

  ngOnInit() {}
}
