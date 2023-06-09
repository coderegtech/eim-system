import { Component } from '@angular/core';
import {
  faCartFlatbed,
  faCartShopping,
  faHouse,
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
  faCartFlatbed = faCartFlatbed;
}
