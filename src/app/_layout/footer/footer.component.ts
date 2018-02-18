import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  links = [
    {
      link: 'dash',
      icon: 'home',
      tooltip: 'google'
    },
    {
      link: '/dash',
      icon: 'settings',
      tooltip: 'ynet'
    },
    {
      link: '/login',
      icon: 'exit_to_app',
      tooltip: 'walla'
    }
  ];

  @Input() isLoginScreen: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}
}
