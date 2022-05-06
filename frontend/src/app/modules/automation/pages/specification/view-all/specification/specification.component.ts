import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { SpecificationService } from '@modules/automation/services/specification.service';
import { AutoSpecificationStore } from '@modules/automation/store/specification/specification.store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss'],
})
export class SpecificationComponent implements OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _autoSpecStore: AutoSpecificationStore,
    private _specificationService: SpecificationService,
  ) {}

  @Input('filteredSpecification') specification!: ISpecification;
  @Input('filteredSpecificationIndex') specificationIndex!: number;

  @Output('onSpecificationDelete')
  onSpecificationDelete: EventEmitter<ISpecification> = new EventEmitter<ISpecification>();

  destroy$ = new Subject();

  SPECIFICATION_PATH = ROUTER_UTILS.config.automation.specification;

  EditSpecification(specificationToBeEdited: ISpecification): void {
    this._autoSpecStore.specification = specificationToBeEdited;
    this._router.navigate(
      [this.SPECIFICATION_PATH.viewOrEdit, specificationToBeEdited.id, 'edit'],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  ViewSpecification(specificationToBeViewed: ISpecification): void {
    this._autoSpecStore.specification = specificationToBeViewed;
    this._router.navigate(
      [this.SPECIFICATION_PATH.viewOrEdit, specificationToBeViewed.id, 'view'],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  DeleteSpecification(specificationToBeDeleted: ISpecification): void {
    if (
      confirm(
        `Do you want to delete the Specification with name ${specificationToBeDeleted.Name} ?\n
It will delete the microbots and other entities using this specification.`,
      )
    ) {
      this._specificationService
        .deleteSpecification$(specificationToBeDeleted.id)
        .pipe(
          takeUntil(this.destroy$),
          tap(() => this.onSpecificationDelete.emit(specificationToBeDeleted)),
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
