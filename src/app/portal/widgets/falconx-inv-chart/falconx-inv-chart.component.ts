import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponentInterface } from '../../interfaces';

@Component({
  selector: 'app-falconx-inv-chart',
  templateUrl: './falconx-inv-chart.component.html',
  styleUrls: ['./falconx-inv-chart.component.css']
})
export class FalconxInvChartComponent implements OnInit, DynamicComponentInterface {
  @Input() object: any;
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

  view: any[] = [600, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'חודש';
  showYAxisLabel = false;
  yAxisLabel = 'כמות לקוחות';
  barPadding = 10;

  colorScheme = {
    domain: ['#a27ea8', '#7aa3e5', '#a27ea8', '#a95963']
  };

  constructor() {}

  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {}
}
