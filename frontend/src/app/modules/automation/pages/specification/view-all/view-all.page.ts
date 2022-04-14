import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { SpecificationService } from '@modules/automation/services/specification.service';
import { Observable, Subject } from 'rxjs';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllSpecificationPage implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _specificationService: SpecificationService,
  ) {}

  destroy$ = new Subject();
  SPECIFICATION_PATH = ROUTER_UTILS.config.automation.specification;

  specifications$!: Observable<ISpecification[]>;

  ngOnInit(): void {
    this.specifications$ = this._specificationService.getSpecifications$();
  }

  onSpecificationDelete(specification: ISpecification): void {
    console.log(specification);
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}