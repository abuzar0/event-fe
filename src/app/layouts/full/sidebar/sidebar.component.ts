import { Component, OnInit } from '@angular/core';
import { navItems, navItemsUSER } from './sidebar-data';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems:any[];

  constructor(public navService: NavService) {
    const role = localStorage.getItem('userRole');

    if (role == 'user') {
      this.navItems = navItemsUSER;
    } else {
      this.navItems = navItems;
    }
  }

  ngOnInit(): void { }
}
