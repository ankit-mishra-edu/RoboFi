import { TestBed } from '@angular/core/testing';
import { TechnologyService } from './technology.service';

describe('RouteService', () => {
  let service: TechnologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(TechnologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
