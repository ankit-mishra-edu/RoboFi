import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { filter, share, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  userProfile$!: Observable<IProfile>;

  media_url = environment.MEDIA_BASE_URL;

  ngOnInit(): void {
    this.userProfile$ = this._activatedRoute.params.pipe(
      filter((params) => params.id !== undefined),
      switchMap((params) => this._userService.profileById$(params.id)),
      share(),
    );
  }
}
