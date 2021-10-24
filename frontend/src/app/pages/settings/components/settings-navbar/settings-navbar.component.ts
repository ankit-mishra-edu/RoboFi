import { Component } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';

@Component({
  selector: 'app-settings-navbar',
  templateUrl: './settings-navbar.component.html',
  styleUrls: ['./settings-navbar.component.scss'],
})
export class SettingsNavbarComponent {
  settingsPath = ROUTER_UTILS.config.settings;
}
