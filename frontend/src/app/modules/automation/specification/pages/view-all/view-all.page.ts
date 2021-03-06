import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { Observable, Subject } from 'rxjs';
import { SpecificationService } from '../../services/specification.service';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllSpecificationPage implements OnInit, OnDestroy {
  constructor(private _specificationService: SpecificationService) {}

  destroy$ = new Subject();
  SPECIFICATION_PATH = ROUTER_UTILS.config.automation.specification;

  specifications$!: Observable<ISpecification[]>;

  ngOnInit(): void {
    this.specifications$ = this._specificationService.getSpecifications$();
  }

  onSpecificationDelete(specification: ISpecification): void {
    console.log('Deleted Specification', specification);
    this.ngOnInit();
  }

  trackBy(index: number, specification: ISpecification): number {
    return specification.id;
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
