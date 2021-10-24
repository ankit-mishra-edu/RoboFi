import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  path = ROUTER_UTILS.config;
  isLoggedIn$!: Observable<boolean>;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
  }

  onClickSignOut(): void {
    this._authService.signOut().subscribe(() => {
      const { root, signIn } = ROUTER_UTILS.config.auth;
      this.router.navigate(['/', root, signIn]);
    });
  }
}
