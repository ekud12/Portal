import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterComponentInterface,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
  GridsterItemComponent
} from 'angular-gridster2';

import { SpkLatestInvoicesWidgetComponent } from '../widgets/spk-latest-invoices-widget/spk-latest-invoices-widget.component';
import { ZakautWidgetComponent } from '../widgets/zakaut-widget/zakaut-widget.component';
import { Observable } from 'rxjs/Observable';
import { GridService } from 'app/portal/grid/grid.service';
import { CustomGridComponent } from 'app/portal/grid/custom-grid-item/custom-grid-item.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  widgetsArray$: Observable<CustomGridComponent[]>;
  options: GridsterConfig;
  dashboard: Array<CustomGridComponent>;
  remove: boolean;

  constructor(private service: GridService) {}

  static eventStop(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ) {
    // console.log('eventStop', item, itemComponent, event);
  }

  static itemChange(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    // console.log('itemChanged', item, itemComponent);
  }

  static itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    // console.log('itemResized', item, itemComponent);
  }

  static itemInit(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    // console.log('itemInitialized', item, itemComponent);
  }

  static itemRemoved(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    // console.log('itemRemoved', item, itemComponent);
  }

  static gridInit(grid: GridsterComponentInterface) {
    // console.log('gridInit', grid);
  }

  static gridDestroy(grid: GridsterComponentInterface) {
    // console.log('gridDestroy', grid);
  }

  emptyCellClick(event: MouseEvent, item: CustomGridComponent) {
    // console.log('empty cell click', event, item);
    this.dashboard.push(item);
  }

  ngOnInit() {
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.CompactUp,
      initCallback: GridComponent.gridInit,
      destroyCallback: GridComponent.gridDestroy,
      itemChangeCallback: GridComponent.itemChange,
      itemResizeCallback: GridComponent.itemResize,
      itemInitCallback: GridComponent.itemInit,
      itemRemovedCallback: GridComponent.itemRemoved,
      margin: 15,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: 10,
      outerMarginBottom: null,
      outerMarginLeft: 10,
      mobileBreakpoint: 640,
      minCols: 10,
      maxCols: 10,
      minRows: 10,
      maxRows: 10,
      maxItemCols: 5,
      minItemCols: 1,
      maxItemRows: 2,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 4,
      scrollSpeed: 9,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        delayStart: 0.5,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: true,
        dragHandleClass: 'drag-handler',
        stop: GridComponent.eventStop
      },
      resizable: {
        delayStart: 1,
        enabled: false,
        stop: GridComponent.eventStop,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: true,
      pushDirections: { north: true, east: false, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: true
    };
    const b = new CustomGridComponent(
      ZakautWidgetComponent,
      ZakautWidgetComponent.myGridSterItemConfig
    );

    this.service.add(b);
    this.service.add(b);
    this.service.add(b);
    this.service.add(b);
    this.service.add(b);
    this.dashboard = this.service.get();
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push();
  }

  destroy() {
    this.remove = !this.remove;
  }
}
