import { GridsterItem } from 'angular-gridster2';
import { Injectable } from '@angular/core';
import { ZakautWidgetComponent } from '../widgets/zakaut-widget/zakaut-widget.component';

export class CustomGridComponent {
  gridster: GridsterItem;
  myTemplate: ZakautWidgetComponent;
  constructor(newTemplate: any, config: GridsterItem) {
    this.myTemplate = newTemplate;
    this.gridster = config;
  }
}
