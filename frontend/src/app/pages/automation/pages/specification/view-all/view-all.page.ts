import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllSpecificationPage implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _specificationService: SpecificationService,
  ) {}

  allSpecifications$!: Observable<ISpecification[]>;
  specificationPath = ROUTER_UTILS.config.automation.specification;

  ngOnInit() {
    this.allSpecifications$ = this._specificationService.allSpecifications$;
  }

  DeleteSpecification(specification: ISpecification): void {
    if (
      confirm(
        `The specification with name ${specification.Name} and version ${specification.Version} will be deleted. Are you sure you want to delete ?`,
      )
    ) {
      this._specificationService
        .deleteSpecification$(specification.id)
        .subscribe(() =>
          this._router.navigate([this.specificationPath.viewAll], {
            relativeTo: this._route.parent,
          }),
        );
    }
  }
}
