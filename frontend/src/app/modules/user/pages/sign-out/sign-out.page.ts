import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage implements OnInit, OnDestroy {
  signOutSub!: Subscription;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.signOutSub = this._authService.signOut().subscribe();
  }

  ngOnDestroy(): void {
    if (this.signOutSub) {
      this.signOutSub.unsubscribe();
    }
  }
}
