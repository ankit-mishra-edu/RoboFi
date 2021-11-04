import { Component } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent {
  authPath = ROUTER_UTILS.config.auth;
  userPath = ROUTER_UTILS.config.user;
}
