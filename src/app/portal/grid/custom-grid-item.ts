import { GridsterItem } from 'angular-gridster2';
import { ZakautWidgetComponent } from '../widgets/zakaut-widget/zakaut-widget.component';
import { Component, Injectable } from '@angular/core';

export class CustomGridComponent {
  gridster: GridsterItem;
  myTemplate: ZakautWidgetComponent;
  constructor(newTemplate: any, config: GridsterItem) {
    this.myTemplate = newTemplate;
    this.gridster = config;
  }
}
