import { Component } from '@angular/core';
import {
  faBars,
  faCartShopping,
  faDollyFlatbed,
  faHouse,
  faTableList,
  faTag,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  // icons
  faHouse = faHouse;
  faTag = faTag;
  faCartShopping = faCartShopping;
  faUserGroup = faUserGroup;
  faDollyFlatbed = faDollyFlatbed;
  faBars = faBars;
  faTableList = faTableList;

  active = false;

  activeNav() {
    this.active = !this.active;
  }
}
