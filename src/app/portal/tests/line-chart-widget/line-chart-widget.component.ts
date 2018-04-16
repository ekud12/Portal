import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-line-chart-widget',
  templateUrl: './line-chart-widget.component.html',
  styleUrls: ['./line-chart-widget.component.css']
})
export class LineChartWidgetComponent implements OnInit {
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

  multi: any[] = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000
        },
        {
          name: '2011',
          value: 8940000
        }
      ]
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002
        },
        {
          name: '2011',
          value: 5800000
        }
      ]
    }
  ];

  view: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  autoScale = true;
  colorScheme = {
    domain: ['#B33771', '#F97F51', '#2C3A47', '#25CCF7']
  };

  constructor() {}
  onSelect(event) {
  }
  ngOnInit() {}
}
