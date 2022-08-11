import { TestBed } from '@angular/core/testing';

import { PlayersApplicationService } from './players-application.service';

describe('PlayersApplicationService', () => {
  let service: PlayersApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
