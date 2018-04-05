import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vertical-chart-widget',
  templateUrl: './vertical-chart-widget.component.html',
  styleUrls: ['./vertical-chart-widget.component.css']
})
export class VerticalChartWidgetComponent implements OnInit {
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
    },
    {
      name: 'מאי',
      value: 50
    },
    {
      name: 'יוני',
      value: 72
    },
    {
      name: 'יולי',
      value: 89
    },
    {
      name: 'אוגוסט',
      value: 50
    },
    {
      name: 'ספטמבר',
      value: 72
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
    domain: ['#674172', '#F62459', '#59ABE3', '#2C3E50', '#26A65B', '#F89406', '#ABB7B7']
  };

  constructor() {}

  ngOnInit() {}
}
