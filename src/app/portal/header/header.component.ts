import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromUserStore from '@userStore';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  version$: Observable<string>;

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
