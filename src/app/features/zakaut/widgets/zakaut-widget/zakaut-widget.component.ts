import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-zakaut-widget',
  templateUrl: './zakaut-widget.component.html',
  styleUrls: ['./zakaut-widget.component.css']
})
export class ZakautWidgetComponent implements OnInit, GridsterItem {
  constructor() {}
  rows = 4;
  cols = 3;
  ngOnInit() {}
}
