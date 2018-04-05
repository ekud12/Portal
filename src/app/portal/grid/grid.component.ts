import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent } from 'ng4-gridstack';
import { NumberStatWidgetComponent } from '../tests/number-stat-widget/number-stat-widget.component';
import { VerticalChartWidgetComponent } from '../tests/vertical-chart-widget/vertical-chart-widget.component';
import { PieChartWidgetComponent } from '../tests/pie-chart-widget/pie-chart-widget.component';
import { HorizontalChartWidgetComponent } from '../tests/horizontal-chart-widget/horizontal-chart-widget.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
  @ViewChild('gridStackMain') gridStackMain: GridStackComponent;
  colorScheme = ['#5AA454', '#A10A28', '#C7B42C'];

  options: GridStackOptions;
  inputs = { num: 600 };
  widgets = {
    1: {
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      maxHeight: 2,
      maxWidth: 2,
      noResize: true,
      noMove: false,
      componentType: NumberStatWidgetComponent,
      input: { num: 6140, ododesc: 'חשבונית אחרונה', borderColor: '#95a5a6' }
    },
    2: {
      width: 2,
      height: 2,
      x: 2,
      y: 0,
      maxHeight: 2,
      maxWidth: 2,
      noResize: true,
      noMove: false,
      componentType: NumberStatWidgetComponent,
      input: { num: 140, ododesc: 'ערף 2', borderColor: '#2c3e50' }
    },
    3: {
      width: 2,
      height: 2,
      x: 4,
      y: 0,
      maxHeight: 2,
      maxWidth: 2,
      noResize: true,
      noMove: false,
      componentType: NumberStatWidgetComponent,
      input: { num: 8780, ododesc: 'לקוחות', borderColor: '#9b59b6' }
    },
    4: {
      width: 2,
      height: 2,
      x: 6,
      y: 0,
      maxHeight: 2,
      maxWidth: 2,
      noResize: true,
      noMove: false,
      componentType: NumberStatWidgetComponent,
      input: { num: 3188, ododesc: 'מס', borderColor: '#d35400' }
    },
    5: {
      width: 2,
      height: 2,
      x: 8,
      y: 0,
      maxHeight: 2,
      maxWidth: 2,
      noResize: true,
      noMove: false,
      componentType: NumberStatWidgetComponent,
      input: { num: 50, ododesc: 'היופ', borderColor: '#16a085' }
    },
    6: {
      width: 2,
      height: 2,
      x: 10,
      y: 0,
      maxHeight: 2,
      maxWidth: 2,
      noResize: true,
      noMove: false,
      componentType: NumberStatWidgetComponent,
      input: { num: 7777, ododesc: 'סטטוס', borderColor: '#bdc3c7' }
    },
    91: {
      width: 4,
      height: 5,
      x: 0,
      y: 10,
      minHeight: 5,
      maxHeight: 5,
      maxWidth: 6,
      noResize: false,
      noMove: false,
      componentType: VerticalChartWidgetComponent,
      input: {}
    },
    92: {
      width: 4,
      height: 5,
      x: 0,
      y: 10,
      minHeight: 5,
      maxHeight: 5,
      maxWidth: 6,
      noResize: false,
      noMove: false,
      componentType: PieChartWidgetComponent,
      input: {}
    },
    93: {
      width: 4,
      height: 5,
      x: 8,
      y: 3,
      minHeight: 5,
      maxHeight: 5,
      maxWidth: 6,
      noResize: false,
      noMove: false,
      componentType: HorizontalChartWidgetComponent,
      input: {}
    }
  };

  myWidgets: GridStackItem[];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.options = new GridStackOptions();
    this.options.rtl = 'true';
    this.options.animate = true;
    this.options.auto = false;
    this.options.alwaysShowResizeHandle = false;
    this.myWidgets = [];
    Object.keys(this.widgets).forEach(val => {
      const newWidget = new GridStackItem();
      newWidget.width = this.widgets[val].width;
      newWidget.height = this.widgets[val].height;
      newWidget.minHeight = this.widgets[val].minHeight;
      newWidget.noResize = this.widgets[val].noResize;
      newWidget.noMove = this.widgets[val].noMove;
      newWidget.componentType = this.widgets[val].componentType;
      newWidget.inputs = this.widgets[val].input;
      newWidget.x = this.widgets[val].x;
      newWidget.y = this.widgets[val].y;
      newWidget.maxHeight = this.widgets[val].maxHeight;
      newWidget.maxWidth = this.widgets[val].maxWidth;
      this.myWidgets.push(newWidget);
      this.cd.detectChanges();
      const arr = this.items.toArray();
      this.gridStackMain.AddWidget(arr[this.items.length - 1]);
    });
    this.updateScreen();
  }

  AddWidget(widgetType: any) {}

  updateScreen() {
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      const evt = document.createEvent('UIEvents');
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    } else {
      window.dispatchEvent(new Event('resize'));
    }
  }
}
