import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // links = [
  //   {
  //     link: 'dash',
  //     icon: 'home',
  //     tooltip: 'google'
  //   },
  //   {
  //     link: '/dash',
  //     icon: 'settings',
  //     tooltip: 'ynet'
  //   },
  //   {
  //     link: '/login',
  //     icon: 'exit_to_app',
  //     tooltip: 'walla'
  //   }
  // ];

  appVersion: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.appVersion = environment.version;
  }
}
