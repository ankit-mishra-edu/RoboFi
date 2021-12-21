import { Component, OnInit } from '@angular/core';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllSpecificationPage implements OnInit {
  constructor(private _specificationService: SpecificationService) {}

  allSpecifications$!: Observable<ISpecification[]>;

  ngOnInit() {
    this.allSpecifications$ =
      this._specificationService.allSpecifications$.pipe(
        map((specifications: ISpecification[]) => [
          ...specifications,
          ...specifications,
        ]),
      );
  }
}
