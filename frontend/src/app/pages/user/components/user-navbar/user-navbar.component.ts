import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  authPath = ROUTER_UTILS.config.auth;
  userPath = ROUTER_UTILS.config.user;

  loggedInUser$!: Observable<IUser>;

  ngOnInit(): void {
    this.loggedInUser$ = this._authService.loggedInUser$;
  }
}
