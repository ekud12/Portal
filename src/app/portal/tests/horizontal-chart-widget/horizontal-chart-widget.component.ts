import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-horizontal-chart-widget',
  templateUrl: './horizontal-chart-widget.component.html',
  styleUrls: ['./horizontal-chart-widget.component.css']
})
export class HorizontalChartWidgetComponent implements OnInit {
  single: any[] = [
    {
      name: 'ינואר',
      value: 89
    },
    {
      name: 'פברואר',
      value: 50
    },
    {
      name: 'מרץ',
      value: 72
    },
    {
      name: 'אפריל',
      value: 89
    }
  ];
  multi: any[] = [];

  view: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'חודש';
  showYAxisLabel = false;
  yAxisLabel = 'כמות לקוחות';
  barPadding = 20;

  colorScheme = {
    domain: ['#B33771', '#F97F51', '#2C3A47', '#25CCF7']
  };

  constructor() {}

  ngOnInit() {}
}
