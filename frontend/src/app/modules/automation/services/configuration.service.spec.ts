import { TestBed } from '@angular/core/testing';
import { AutomationConfigurationService } from './configuration.service';

describe('AutomationConfigurationService', () => {
  let service: AutomationConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomationConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
