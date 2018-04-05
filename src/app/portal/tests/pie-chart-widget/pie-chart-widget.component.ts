import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pie-chart-widget',
  templateUrl: './pie-chart-widget.component.html',
  styleUrls: ['./pie-chart-widget.component.css']
})
export class PieChartWidgetComponent implements OnInit {
  single: any[] = [
    {
      name: 'לקוחות טובים',
      value: 89
    },
    {
      name: 'בלי כרטיס',
      value: 50
    },
    {
      name: 'דווחו',
      value: 72
    },
    {
      name: 'אישור זמני',
      value: 89
    },
    {
      name: 'חשבוניות פתוחות',
      value: 50
    },
    {
      name: 'ממתינים',
      value: 72
    },
    {
      name: 'להדפסה',
      value: 89
    },
    {
      name: 'שורות לחשבונית',
      value: 50
    },
    {
      name: 'תשלומים',
      value: 72
    }
  ];

  view: any[];
  showLegend = false;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  colorScheme = {
    domain: ['#7aa3e5', '#a95963', '#0984e3', '#fdcb6e', '#e84393', '#6c5ce7', '#00b894', '#dfe6e9', '#ff7675']
  };

  constructor() {}

  ngOnInit() {}
}
