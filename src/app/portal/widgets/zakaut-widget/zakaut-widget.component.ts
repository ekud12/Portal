import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-zakaut-widget',
  templateUrl: './zakaut-widget.component.html',
  styleUrls: ['./zakaut-widget.component.css']
})
export class ZakautWidgetComponent implements OnInit {
  @Input() obj: string;
  constructor() {}

  ngOnInit() {
    // console.log('CREATED:::SPK WIDGET::::');
  }
}
