import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  single = [
    {
      name: 'Germany',
      value: 40632
    }
  ];
  multi: any[];

  view: any[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor() {}

  ngOnInit() {}
  onSelect(event) {
    console.log(event);
  }
}
