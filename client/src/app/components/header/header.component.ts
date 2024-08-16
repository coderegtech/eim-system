import { Component } from '@angular/core';
import {
  faBell,
  faChevronDown,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faBell = faBell;
  faChevronDown = faChevronDown;
  faSun = faSun;
  
  constructor(public utilsService: UtilsService) {
    
  }

}
