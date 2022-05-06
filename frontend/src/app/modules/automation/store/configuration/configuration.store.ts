import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoConfigStore {
  // CURRENT/SELECTED CONFIGURATION TO BE SHARED ACROSS COMPONENTS
  private _configurationSubject: BehaviorSubject<IAutomationConfiguration> =
    new BehaviorSubject<IAutomationConfiguration>(
      {} as IAutomationConfiguration,
    );

  get configuration$(): Observable<IAutomationConfiguration> {
    return this._configurationSubject.asObservable();
  }

  set configuration(configurationData: IAutomationConfiguration) {
    this._configurationSubject.next(configurationData);
  }

  // CURRENT/SELECTED CONFIGURATION ENTRY TO BE SHARED ACROSS COMPONENTS
  private _configEntrySubject: BehaviorSubject<IAutomationConfigurationEntry> =
    new BehaviorSubject<IAutomationConfigurationEntry>(
      {} as IAutomationConfigurationEntry,
    );

  get configEntry$(): Observable<IAutomationConfigurationEntry> {
    return this._configEntrySubject.asObservable();
  }

  set configEntry(configEntryData: IAutomationConfigurationEntry) {
    this._configEntrySubject.next(configEntryData);
  }
}
