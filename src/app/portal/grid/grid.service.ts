import { Injectable } from '@angular/core';
import {
  GridsterItemComponent,
  GridsterPush,
  GridsterPushResize,
  GridsterSwap
} from 'angular-gridster2';
import { CustomGridComponent } from './custom-grid-item';

@Injectable()
export class GridService {
  array: CustomGridComponent[] = [];
  constructor() {}

  add(gridsterItemComponent: CustomGridComponent) {
    this.array.push(gridsterItemComponent);
    // similar for GridsterPushResize and GridsterSwap
  }

  get() {
    return this.array;
  }
}
