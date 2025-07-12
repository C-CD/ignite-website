import { TestBed } from '@angular/core/testing';

import { PromoQuestionService } from './promo-question.service';

describe('PromoQuestionService', () => {
  let service: PromoQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
