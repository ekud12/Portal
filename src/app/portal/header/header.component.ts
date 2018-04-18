import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  version$: Observable<string>;
  env = environment.version;
  links = [
    {
      link: '/portal/grid',
      icon: 'grid_on',
      tooltip: 'דשבורד'
    }
  ];

  @Input() sidenav;

  constructor(private router: Router) {}

  ngOnInit() {}
}
