import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllSpecificationPage implements OnInit {
  constructor(private _specificationService: SpecificationService) {}

  allSpecifications$!: Observable<ISpecification[]>;
  specificationPath = ROUTER_UTILS.config.automation.specification;

  ngOnInit() {
    this.allSpecifications$ = this._specificationService.allSpecifications$;

    // this.allSpecifications$ =
    // this._specificationService.allSpecifications$.pipe(
    //   map((specifications: ISpecification[]) => [
    //     ...specifications,
    //     ...specifications,
    //   ]),
    // );
  }
}
