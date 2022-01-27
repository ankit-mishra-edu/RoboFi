import { Component, Input } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';

@Component({
  selector: 'app-automation-navbar',
  templateUrl: './automation-navbar.component.html',
  styleUrls: ['./automation-navbar.component.scss'],
})
export class AutomationNavbarComponent {
  automationPath = ROUTER_UTILS.config.automation;

  @Input('isSidebarOpen') isSidebarOpen: boolean = false;
}
