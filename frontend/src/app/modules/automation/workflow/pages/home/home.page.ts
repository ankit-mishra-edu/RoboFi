import { Component } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class WorkflowHomePage {
  WORKFLOW_PATH = ROUTER_UTILS.config.automation.workflow;
}
