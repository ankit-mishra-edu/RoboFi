import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  loggedInUser$!: Observable<IUser>;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._authService.loggedInUser$;
  }
}
