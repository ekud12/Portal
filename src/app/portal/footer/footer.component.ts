import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  appVersion: string;

  constructor() {}

  ngOnInit() {
    this.appVersion = environment.version;
  }
}
