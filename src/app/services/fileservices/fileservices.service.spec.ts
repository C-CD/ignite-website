import { TestBed } from '@angular/core/testing';

import { FileservicesService } from './fileservices.service';

describe('FileservicesService', () => {
  let service: FileservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
