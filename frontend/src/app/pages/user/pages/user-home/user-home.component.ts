import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  loggedInUser$!: Observable<IUser>;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._userService.getLoggedInUser$();
  }
}
