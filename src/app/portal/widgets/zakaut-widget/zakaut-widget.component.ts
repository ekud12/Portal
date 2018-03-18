import { Component, OnInit } from '@angular/core';
import { GridsterItem, GridsterComponentInterface } from 'angular-gridster2';

@Component({
  selector: 'app-zakaut-widget',
  templateUrl: './zakaut-widget.component.html',
  styleUrls: ['./zakaut-widget.component.css']
})
export class ZakautWidgetComponent implements OnInit {
  public static myGridSterItemConfig: GridsterItem = {
    cols: 2,
    rows: 1,
    dragEnabled: false
  };

  constructor() {}

  ngOnInit() {
    console.log('CREATED:::::::');
  }
}
