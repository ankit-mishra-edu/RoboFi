import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MicrobotService } from '../../services/microbot.service';
import { AutoMicrobotStore } from '../../store/microbot.store';

@Component({
  selector: 'app-microbot',
  templateUrl: './microbot.component.html',
  styleUrls: ['./microbot.component.scss'],
})
export class MicrobotComponent implements OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _microbotService: MicrobotService,
    private _autoMicrobotStore: AutoMicrobotStore,
  ) {}

  @Input('filteredMicrobot') microbot!: IMicrobot;
  @Input('filteredMicrobotIndex') microbotIndex!: number;

  @Output('onMicrobotDelete')
  onMicrobotDelete: EventEmitter<IMicrobot> = new EventEmitter<IMicrobot>();

  destroy$ = new Subject();

  MICROBOT_PATH = ROUTER_UTILS.config.automation.microbot;

  EditMicrobot(microbotToBeEdited: IMicrobot): void {
    this._autoMicrobotStore.microbot = microbotToBeEdited;
    this._router.navigate(
      [this.MICROBOT_PATH.viewOrEdit, microbotToBeEdited.id, 'edit'],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  ViewMicrobot(microbotToBeViewed: IMicrobot): void {
    this._autoMicrobotStore.microbot = microbotToBeViewed;
    this._router.navigate(
      [this.MICROBOT_PATH.viewOrEdit, microbotToBeViewed.id, 'view'],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  DeleteMicrobot(microbotToBeDeleted: IMicrobot): void {
    if (
      confirm(
        `Do you want to delete the Microbot with name ${microbotToBeDeleted.Name} ?\n
It will delete the entities using this microbot.`,
      )
    ) {
      this._microbotService
        .deleteMicrobot$(microbotToBeDeleted.id)
        .pipe(
          takeUntil(this.destroy$),
          tap(() => this.onMicrobotDelete.emit(microbotToBeDeleted)),
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
