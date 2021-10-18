import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeList, ThemeService } from '@app/@core/services/theme';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  path = ROUTER_UTILS.config;
  theme = ThemeList;

  constructor(private themeService: ThemeService, private _router: Router) {}

  ngOnInit(): void {
    const { root, signIn } = this.path.auth;
    // this._router.navigate(['/', root, signIn]);
  }

  onClickChangeTheme(theme: ThemeList): void {
    this.themeService.setTheme(theme);
  }
}
