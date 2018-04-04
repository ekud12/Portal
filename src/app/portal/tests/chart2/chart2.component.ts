import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {
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
    domain: ['#a27ea8', '#7aa3e5', '#a27ea8', '#a95963']
  };

  constructor() {}

  ngOnInit() {}
}
