import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage implements OnInit, OnDestroy {
  signOutSub!: Subscription;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.signOutSub = this._authService.signOut().subscribe(() => {
      console.log('In Sign Out page');
      const { root, signIn } = ROUTER_UTILS.config.auth;
      this._router.navigate(['/', root, signIn]);
    });
  }

  ngOnDestroy(): void {
    if (this.signOutSub) {
      this.signOutSub.unsubscribe();
    }
  }
}
