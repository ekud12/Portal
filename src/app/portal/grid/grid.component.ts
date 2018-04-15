import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent } from 'ng4-gridstack';
import { NumberStatWidgetComponent } from '../tests/number-stat-widget/number-stat-widget.component';
import { VerticalChartWidgetComponent } from '../tests/vertical-chart-widget/vertical-chart-widget.component';
import { PieChartWidgetComponent } from '../tests/pie-chart-widget/pie-chart-widget.component';
import { HorizontalChartWidgetComponent } from '../tests/horizontal-chart-widget/horizontal-chart-widget.component';
import { PieChartAdvancedWidgetComponent } from '../tests/pie-chart-advanced-widget/pie-chart-advanced-widget.component';
import { LineChartWidgetComponent } from '../tests/line-chart-widget/line-chart-widget.component';
import { Store } from '@ngrx/store';
import * as fromWidgetStore from '@portalStore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
  @ViewChild('gridStackMain') gridStackMain: GridStackComponent;
  activeWidgets$: Observable<any>;
  options: GridStackOptions;

  myWidgets: GridStackItem[];

  constructor(private cd: ChangeDetectorRef, private widgetStore: Store<fromWidgetStore.DashboardState>) {
    this.widgetStore.dispatch(new fromWidgetStore.InitWidgets());
    this.activeWidgets$ = this.widgetStore.select(fromWidgetStore.activeWidgetsSelector);
  }

  ngOnInit() {
    this.options = new GridStackOptions();
    this.options.rtl = 'true';
    this.options.animate = true;
    this.options.auto = false;
    this.options.alwaysShowResizeHandle = false;
    this.myWidgets = [];
    this.activeWidgets$.subscribe(val => {
      val.map(wi => {
        this.myWidgets.push(wi);
        this.cd.detectChanges();
        const arr = this.items.toArray();
        this.gridStackMain.AddWidget(arr[this.items.length - 1]);
      });
    });
    this.updateScreen();
  }

  AddWidget(widget) {}

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
