import { Injectable } from '@angular/core';
import { CustomGridComponent } from 'app/portal/grid/custom-grid-item/custom-grid-item.component';

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
