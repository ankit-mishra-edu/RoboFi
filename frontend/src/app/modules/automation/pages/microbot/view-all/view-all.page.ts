import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { MicrobotService } from '@modules/automation/services/microbot.service';
import { Observable, Subject } from 'rxjs';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllMicrobotPage implements OnInit, OnDestroy {
  constructor(private _micrbotService: MicrobotService) {}

  destroy$ = new Subject();
  MICROBOT_PATH = ROUTER_UTILS.config.automation.microbot;

  microbots$!: Observable<IMicrobot[]>;

  ngOnInit(): void {
    this.microbots$ = this._micrbotService.getMicrobots$();
  }

  onMicrobotDelete(microbot: IMicrobot): void {
    console.log('Deleted Microbot', microbot);
    this.ngOnInit();
  }

  trackBy(index: number, microbot: IMicrobot): number {
    return microbot.id;
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
