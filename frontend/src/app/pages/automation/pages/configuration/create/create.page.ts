import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import {
  ConfigurationEntryForm,
  ConfigurationForm,
} from '@app/pages/automation/forms';
import { AutomationConfigurationService } from '@app/pages/automation/services/configuration.service';
import { iif, Observable } from 'rxjs';
import { share, switchMap, tap } from 'rxjs/operators';
import { isInValid, isValid } from '../../../validators/custom.validator';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class AutomationAddConfigEntryPage implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _autoConfigService: AutomationConfigurationService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;

  configEntryForm!: FormGroup;
  configEntryFormObj!: ConfigurationEntryForm;

  configurationForm!: FormGroup;
  configurationFormObj!: ConfigurationForm;
  configuration$!: Observable<IAutomationConfiguration>;
  configurationPath = ROUTER_UTILS.config.automation.configuration;

  ngOnInit() {
    this.configEntryFormObj = new ConfigurationEntryForm(this._formBuilder);
    this.configEntryForm = this.configEntryFormObj.InitForm();

    this.configurationFormObj = new ConfigurationForm(this._formBuilder);
    this.configurationForm = this.configurationFormObj.InitForm();

    this.configuration$ = this._autoConfigService.configuration$
      .pipe(
        switchMap((configuration: IAutomationConfiguration) =>
          iif(
            () => configuration.id != undefined,
            this._autoConfigService.configuration$,
            this._autoConfigService.configurationByUserId$,
          ),
        ),
      )
      .pipe(
        share(),
        tap((configuration: IAutomationConfiguration) => {
          this.configurationForm.patchValue(configuration);
          configuration.entries.forEach(
            (configEntry: IAutomationConfigurationEntry) =>
              this.AddConfigEntry(configEntry),
          );

          this.configEntryForm.patchValue({
            id: 0,
            user: <IUser>this.value('user').value,
          });
        }),
      );
  }

  UpdateConfigurationForUser() {
    this.AddConfigEntry(this.configEntryForm.value);
    this._autoConfigService
      .updateConfigurationForUser$(
        this.value('id').value,
        this.configurationForm.value,
      )
      .subscribe((_: IAutomationConfiguration) =>
        this._router.navigate([this.configurationPath.viewAll], {
          relativeTo: this._route.parent?.parent,
        }),
      );
  }

  CancleUpdateConfiguration() {
    this._router.navigate([this.configurationPath.viewAll], {
      relativeTo: this._route.parent?.parent,
    });
  }

  value(controlName: string): AbstractControl {
    return this.configurationForm.controls[controlName];
  }

  value_e(index: number, controlName: string): AbstractControl {
    return (<FormGroup>this.configurationForm.controls['entries'].get([index]))
      .controls[controlName];
  }

  // Input Parameters
  get configEntryFormsArr() {
    return this.configurationFormObj.configEntryFormsArr;
  }

  AddConfigEntry(configEntry: IAutomationConfigurationEntry) {
    this.configurationFormObj.AddConfigEntry(configEntry);
  }
}
