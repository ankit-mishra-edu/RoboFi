import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { ConfigurationEntryForm } from '@modules/automation/forms';
import { AutoConfigService } from '@modules/automation/services/configuration.service';
import { AutoConfigStore } from '@modules/automation/store/configuration/configuration.store';
import { iif, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { isInValid, isValid } from '../../../validators/custom.validator';

@Component({
  templateUrl: './view-or-edit.page.html',
  styleUrls: ['./view-or-edit.page.scss'],
})
export class AutomationViewOrEditConfigEntryPage implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _autoConfigStore: AutoConfigStore,
    private _autoConfigService: AutoConfigService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;

  mode!: 'edit' | 'view';

  configEntryForm!: FormGroup;
  configEntryFormObj!: ConfigurationEntryForm;

  configEntry$!: Observable<IAutomationConfigurationEntry>;
  configurationPath = ROUTER_UTILS.config.automation.configuration;

  ngOnInit(): void {
    this.configEntryFormObj = new ConfigurationEntryForm(this._formBuilder);
    this.configEntryForm = this.configEntryFormObj.InitForm();

    this.configEntry$ = this._route.params.pipe(
      tap((routeParams: Params) => (this.mode = routeParams.mode)),
      switchMap((routeParams: Params) =>
        this._autoConfigStore.configEntry$.pipe(
          switchMap((configEntry: IAutomationConfigurationEntry) =>
            iif(
              () => configEntry.id != undefined,
              this._autoConfigStore.configEntry$,
              this._autoConfigService.configEntryById$(routeParams.id),
            ),
          ),
          tap((configEntry: IAutomationConfigurationEntry) => {
            this.configEntryForm.patchValue(configEntry);
          }),
        ),
      ),
    );
  }

  UpdateConfigEntry(): void {
    this._autoConfigService
      .updateConfigEntry$(this.value('id').value, this.configEntryForm.value)
      .subscribe(() =>
        this._router.navigate([this.configurationPath.viewAll], {
          relativeTo: this._route.parent?.parent,
        }),
      );
  }

  CancleUpdateConfigEntry(): void {
    this._router.navigate([this.configurationPath.viewAll], {
      relativeTo: this._route.parent?.parent,
    });
  }

  value(controlName: string): AbstractControl {
    return this.configEntryForm.controls[controlName];
  }
}
