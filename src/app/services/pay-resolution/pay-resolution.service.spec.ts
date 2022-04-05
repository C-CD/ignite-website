import { TestBed } from '@angular/core/testing';

import { PayResolutionService } from './pay-resolution.service';

describe('PayResolutionService', () => {
  let service: PayResolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayResolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
