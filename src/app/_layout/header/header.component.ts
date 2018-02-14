import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links = [
    {
      link: 'dash',
      icon: 'home',
      tooltip: 'google'
    },
    {
      link: 'dash2',
      icon: 'settings',
      tooltip: 'ynet'
    },
    {
      link: 'login',
      icon: 'grid_on',
      tooltip: 'walla'
    }
  ];

  @Input() isLoginScreen: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}
}
