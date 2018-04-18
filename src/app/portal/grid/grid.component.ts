import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromWidgetStore from '@portalStore';
import { GridStackComponent, GridStackItem, GridStackItemComponent, GridStackOptions } from 'ng4-gridstack';
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

  /** fix pushing to be correct only for new items not all */

  ngOnInit() {
    /** check what happens with store copy of objects - error in chrome */
    this.options = new GridStackOptions();
    this.options.rtl = 'true';
    this.options.animate = true;
    this.options.auto = false;
    this.options.alwaysShowResizeHandle = false;
    this.myWidgets = [];
    this.activeWidgets$.take(1).subscribe(val => {
      val.map(wi => {
        this.myWidgets.push(wi);
        this.cd.detectChanges();
        const arr = this.items.toArray();
        this.gridStackMain.AddWidget(arr[this.items.length - 1]);
      });
    });
    this.updateScreen();
  }

  AddWidget() {}

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
