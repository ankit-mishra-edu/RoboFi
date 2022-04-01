import { TestBed } from '@angular/core/testing';

import { MicrobotService } from './microbot.service';

describe('MicrobotService', () => {
  let service: MicrobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
