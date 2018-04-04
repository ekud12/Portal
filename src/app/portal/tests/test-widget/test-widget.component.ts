import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css']
})
export class TestWidgetComponent implements OnInit {
  @Input() num: number;
  @Input() ododesc: string;
  @Input() borderColor: string;


  constructor() {}

  ngOnInit() {
  }
}
