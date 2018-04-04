import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css']
})
export class TestWidgetComponent implements OnInit {
  @Input() num: number;
  @Input() ododesc: string;
  $myColor = 'yellow';
  element: HTMLElement = document.getElementById('container');

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor() {}

  ngOnInit() {}
}
