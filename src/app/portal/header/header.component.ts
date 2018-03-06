import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  version$: Observable<string>;

  links = [
    // {
    //   link: '/dash/zakaut',
    //   icon: 'home',
    //   tooltip: 'דף ראשי'
    // },
    {
      link: '/portal/grid',
      icon: 'grid_on',
      tooltip: 'דשבורד'
    }
    // {
    //   link: '/login',
    //   icon: 'exit_to_app',
    //   tooltip: 'התנתק'
    // }
  ];

  @Input() sidenav;

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit() {}
}
