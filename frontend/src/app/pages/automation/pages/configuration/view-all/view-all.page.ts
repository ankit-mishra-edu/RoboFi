import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ConfigurationForm } from '@app/pages/automation/forms';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { AutomationConfigurationService } from '../../../services/configuration.service';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class AutomationViewAllConfigurationPage implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _autoConfigService: AutomationConfigurationService,
  ) {}

  configurationForm!: FormGroup;
  configurationFormObj!: ConfigurationForm;
  configurationByUserId$!: Observable<IAutomationConfiguration>;
  configurationPath = ROUTER_UTILS.config.automation.configuration;

  ngOnInit(): void {
    this.configurationFormObj = new ConfigurationForm(this._formBuilder);
    this.configurationForm = this.configurationFormObj.InitForm();

    this.configurationByUserId$ =
      this._autoConfigService.configurationByUserId$.pipe(
        share(),
        tap((configuration: IAutomationConfiguration) => {
          this.configurationForm.patchValue(configuration);
          if (
            (<FormArray>this.configurationForm.get('entries')).controls
              .length == 0
          ) {
            configuration.entries.forEach(
              (configEntry: IAutomationConfigurationEntry) =>
                this.AddConfigEntry(configEntry),
            );
          }
        }),
      );
  }

  // ADD CONFIG ENTRY TO FORM
  get configEntryFormsArr(): FormArray {
    return this.configurationFormObj.configEntryFormsArr;
  }

  AddConfigEntry(configEntry: IAutomationConfigurationEntry): void {
    this.configurationFormObj.AddConfigEntry(configEntry);
  }

  // REFRESH UI ON CONFIGURATION ENTRY CRUD OPERATIONS
  onConfigurationChange(event: IAutomationConfigurationEntry): void {
    console.log(event);
    this.ngOnInit();
  }

  // CONFIGURATION CRUD OPERATIONS
  onCreateConfigurationOfUser(): void {
    this.configurationForm.patchValue({
      user: this._authService.loggedInUser.id,
    });
    this._autoConfigService
      .createConfigurationForUser$(this.configurationForm.value)
      .subscribe(() => this.ngOnInit());
  }

  onAddConfigEntryForUser(): void {
    this._autoConfigService.configuration = this.configurationForm.value;
    this._router.navigate(
      [this.configurationPath.entry.root, this.configurationPath.entry.create],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  onDeleteConfigurationOfUser(id: number): void {
    this._autoConfigService
      .deleteConfigurationOfUser$(id)
      .subscribe(() => this.ngOnInit());
  }
}
