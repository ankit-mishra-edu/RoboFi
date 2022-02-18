import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss'],
})
export class SpecificationComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _specificationService: SpecificationService,
  ) {}

  @Input('filteredSpecification') specification!: ISpecification;
  @Input('filteredSpecificationIndex') specificationIndex!: number;

  @Output('onSpecificationDelete')
  onSpecificationDelete: EventEmitter<ISpecification> = new EventEmitter<ISpecification>();

  destroy$ = new Subject();

  SPECIFICATION_PATH = ROUTER_UTILS.config.automation.specification;

  ngOnInit(): void {}

  EditSpecification(specificationToBeEdited: ISpecification) {
    this._specificationService.specification = specificationToBeEdited;
    this._router.navigate(
      [this.SPECIFICATION_PATH.viewOrEdit, specificationToBeEdited.id, 'edit'],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  ViewSpecification(specificationToBeViewed: ISpecification) {
    this._specificationService.specification = specificationToBeViewed;
    this._router.navigate(
      [this.SPECIFICATION_PATH.viewOrEdit, specificationToBeViewed.id, 'view'],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  DeleteSpecification(specificationToBeDeleted: ISpecification) {
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

  ngOnDestroy() {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
