import { Injectable } from '@angular/core';
import { CustomGridComponent } from './custom-grid-item';

@Injectable()
export class GridService {
  array: CustomGridComponent[] = [];

  constructor() {}

  add(gridsterItemComponent: CustomGridComponent) {
    this.array.push(gridsterItemComponent);
  }

  get() {
    return this.array;
  }
}
