import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'app/core/animations';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  animations: [fadeAnimation]
})
export class ContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
