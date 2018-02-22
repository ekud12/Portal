import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links = [
    // {
    //   link: '/dash/zakaut',
    //   icon: 'home',
    //   tooltip: 'דף ראשי'
    // },
    {
      link: '/dash/grid',
      icon: 'grid_on',
      tooltip: 'דשבורד'
    },
    {
      link: '/login',
      icon: 'exit_to_app',
      tooltip: 'התנתק'
    }
  ];

  @Input() sidenav;

  constructor(private router: Router) {}

  ngOnInit() {}
}
