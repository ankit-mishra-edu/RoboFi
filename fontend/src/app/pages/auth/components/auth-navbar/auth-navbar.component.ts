import { Component } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss'],
})
export class AuthNavbarComponent {
  authPath = ROUTER_UTILS.config.auth;
}
