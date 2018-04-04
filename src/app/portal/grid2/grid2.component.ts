import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent } from 'ng4-gridstack';
import { TestWidgetComponent } from '../tests/test-widget/test-widget.component';
import { Chart2Component } from '../tests/chart2/chart2.component';

@Component({
  selector: 'app-grid2',
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.css']
})
export class Grid2Component implements OnInit {
  @ViewChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
  @ViewChild('gridStackMain') gridStackMain: GridStackComponent;
  colorScheme = ['#5AA454', '#A10A28', '#C7B42C'];

  options: GridStackOptions;
  inputs = { num: 600 };
  widgets = {
    5: {
      width: 6,
      height: 5,
      x: 6,
      y: 7,
      minHeight: 5,
      noResize: false,
      noMove: false,
      componentType: Chart2Component,
      input: {}
    },
    1: {
      width: 2,
      height: 2,
      x: 4,
      y: 0,
      minHeight: 2,
      noResize: true,
      noMove: false,
      componentType: TestWidgetComponent,
      input: { num: 6140, ododesc: 'חשבונית אחרונה', color: 'red' }
    },
    2: {
      width: 2,
      height: 2,
      minHeight: 2,
      x: 2,
      y: 0,
      noResize: true,
      noMove: false,
      componentType: TestWidgetComponent,
      input: { num: 58660, ododesc: 'סה"כ תשלומים' }
    },
    3: {
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      minHeight: 2,
      noResize: true,
      noMove: false,
      componentType: TestWidgetComponent,
      input: { num: 5180, ododesc: 'לקוחות חדשים' }
    },
    4: {
      width: 2,
      x: 0,
      y: 2,
      height: 2,
      minHeight: 2,
      noResize: true,
      noMove: false,
      componentType: TestWidgetComponent,
      input: { num: 34580, ododesc: 'סכימה חודשית' }
    }
  };
  myWidgets: GridStackItem[] = [];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.options = new GridStackOptions();
    this.options.rtl = 'true';
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
      // newWidget.maxHeight = 5;
      // newWidget.maxWidth = 6;
      this.myWidgets.push(newWidget);
      this.cd.detectChanges();
      const arr = this.items.toArray();
      this.gridStackMain.AddWidget(arr[this.items.length - 1]);
    });
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
