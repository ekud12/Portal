import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterComponentInterface,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType
} from 'angular-gridster2';
import {
  SpkLatestInvoicesWidgetComponent
} from '../../features/invoices/components/spk-latest-invoices-widget/spk-latest-invoices-widget.component';

export interface CustomGridComponent {
  gridster: GridsterItem;
  template: any;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<CustomGridComponent>;
  remove: boolean;

  static eventStop(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ) {
    console.log('eventStop', item, itemComponent, event);
  }

  static itemChange(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    console.log('itemResized', item, itemComponent);
  }

  static itemInit(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    console.log('itemInitialized', item, itemComponent);
  }

  static itemRemoved(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    console.log('itemRemoved', item, itemComponent);
  }

  static gridInit(grid: GridsterComponentInterface) {
    console.log('gridInit', grid);
  }

  static gridDestroy(grid: GridsterComponentInterface) {
    console.log('gridDestroy', grid);
  }

  emptyCellClick(event: MouseEvent, item: CustomGridComponent) {
    console.log('empty cell click', event, item);
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
      margin: 30,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      mobileBreakpoint: 640,
      minCols: 4,
      maxCols: 4,
      minRows: 4,
      maxRows: 100,
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
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: true
    };

    this.dashboard = [
      {
        gridster: { cols: 2, rows: 1, y: undefined, x: undefined },
        template: SpkLatestInvoicesWidgetComponent
      },
      {
        gridster: { cols: 1, rows: 1, y: undefined, x: undefined },
        template: SpkLatestInvoicesWidgetComponent
      },
      {
        gridster: { cols: 2, rows: 1, y: undefined, x: undefined },
        template: SpkLatestInvoicesWidgetComponent
      },
      {
        gridster: { cols: 1, rows: 1, y: undefined, x: undefined },
        template: SpkLatestInvoicesWidgetComponent
      }
      // {
      //   cols: 1,
      //   rows: 1,
      //   y: 2,
      //   x: 4,
      //   dragEnabled: true,
      //   resizeEnabled: true,
      //   label: 'Drag&Resize Disabled'
      // },
      // { cols: 1, rows: 1, y: 2, x: 6, initCallback: GridComponent.itemInit }
    ];
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log(item);
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push();
  }

  destroy() {
    this.remove = !this.remove;
  }
}
