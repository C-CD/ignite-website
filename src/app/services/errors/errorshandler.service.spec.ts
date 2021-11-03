import { TestBed } from '@angular/core/testing';

import { ErrorshandlerService } from './errorshandler.service';

describe('ErrorshandlerService', () => {
  let service: ErrorshandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorshandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
