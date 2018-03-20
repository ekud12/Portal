import { GridsterItem } from 'angular-gridster2';
import { Component, Injectable } from '@angular/core';
import { ZakautWidgetComponent } from 'app/portal/widgets/zakaut-widget/zakaut-widget.component';

@Component({
  selector: 'app-custom-grid-item',
  templateUrl: './custom-grid-item.component.html',
  styleUrls: ['./custom-grid-item.component.css']
})
export class CustomGridComponent {
  gridster: GridsterItem;
  myTemplate: ZakautWidgetComponent;
  constructor(newTemplate: any, config: GridsterItem) {
    this.myTemplate = newTemplate;
    this.gridster = config;
  }
}
