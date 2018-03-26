import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { fadeAnimation } from 'app/core/animations';
import { spinnerTemplate } from './core/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  title = 'app';
  spinnerTemplate = spinnerTemplate;

  ngOnInit() {}
}
